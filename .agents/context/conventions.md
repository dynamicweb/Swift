# Code Conventions — Dynamicweb10

Conventions inferred from `Directory.Build.props`, `.editorconfig`, and representative source files. Follow these in all new and modified code.

---

## Namespaces

- **File-scoped** namespace declarations throughout:
  ```csharp
  namespace Dynamicweb.Ecommerce.Orders;
  ```
- Root namespace is `Dynamicweb` or `Dynamicweb.<Feature>`
- Feature sub-namespaces follow the domain: `Dynamicweb.Ecommerce.Orders.Discounts`, `Dynamicweb.DataIntegration.Integration`
- Test namespaces mirror source: `Dynamicweb.Core.Tests`, `Dynamicweb.Ecommerce.Tests`

---

## Nullable Reference Types

- **Enabled globally** (`<Nullable>enable</Nullable>` in `Directory.Build.props`)
- Exception: `Dynamicweb.Ecommerce` has `<Nullable>disable</Nullable>` — legacy project, do not enable without a dedicated PR
- Annotate nullable returns and parameters with `?`
- Do not use the `!` null-forgiving operator without a code comment explaining why it cannot be null
- Prefer null-checks and null-conditional operators (`?.`, `??`) over `!`

---

## Warnings as Errors

- `<TreatWarningsAsErrors>true</TreatWarningsAsErrors>` in Release builds
- `FastBuild` mode (`--property FastBuild=true`) disables this for inner-loop iteration only
- Globally suppressed: `CS1591` (missing XML doc), `NU1903`, `NU1510`
- Per-project suppressions go in `GlobalSuppressions.cs` using `[assembly: SuppressMessage(...)]`
- Do not use `#pragma warning disable` inline without a comment

---

## XML Documentation

- `<GenerateDocumentationFile>true</GenerateDocumentationFile>` on all non-test, non-example projects
- All public types and members require `<summary>` XML doc comments
- Use `<param>`, `<returns>`, `<exception>`, `<remarks>` where helpful
- `<see cref="..."/>` for cross-references

---

## Dependency Injection

```csharp
// Registration — in XxxDependencyProvider.cs
internal sealed class MyDependencyProvider : DependencyProvider
{
    protected override void ConfigureServices(DependencyContainer container)
    {
        container.AddSingleton<IMyService, MyService>();
        container.AddTransient<IMyFactory, MyFactory>();
        // Keyed registrations for multiple implementations:
        container.AddKeyedSingleton<ICacheManager, RedisCacheManager>("redis");
    }
}

// Domain-specific wiring — in ServiceExtensions.cs
public static class MyServiceExtensions
{
    public static IServiceCollection AddMyFeature(this IServiceCollection services) { ... }
}
```

- Default lifetime: **Singleton**
- Use **Transient** only for lightweight, stateless factories or services with mutable state per-call
- `InternalsVisibleTo` for `*.Tests` and `*.IntegrationTests` projects is auto-added by `Directory.Build.props` — do not add it manually

---

## Extensibility Add-Ins

```csharp
[AddInName("Dynamicweb.MyFeature.MyProvider")]
[AddInDescription("Short description for the admin UI")]
public class MyProvider : BaseProvider
{
    // Required constructors:
    public MyProvider() { }
    public MyProvider(string filename) { }
    public MyProvider(XmlNode xmlNode) { }
}
```

- Add-ins are discovered by reflection at runtime
- The three constructor forms are mandatory for DataIntegration providers

---

## Notifications (Observer Pattern)

```csharp
// Define
public class OrderCreatedNotification : Notification<Order> { }

// Subscribe
NotificationManager.Subscribe<OrderCreatedNotification>(handler);

// Raise
NotificationManager.Notify(new OrderCreatedNotification(order));
```

---

## Testing

### Structure

- `[TestClass]` on the class, `[TestMethod]` on each test
- One test class per subject class; file name: `MyClassTests.cs`
- Test method names are descriptive: `Test_the_generic_constructor`, `OrderTotal_IncludesVat_WhenVatEnabled`

### Assertions

```csharp
Assert.AreEqual(expected, actual);
Assert.IsTrue(condition);
Assert.IsNotNull(value);
Assert.ThrowsException<InvalidOperationException>(() => sut.DoThing());
```

### Mocking (NSubstitute)

```csharp
var repo = Substitute.For<IOrderRepository>();
repo.GetById(42).Returns(new Order { Id = 42 });
```

### Integration tests

- Connect to **real SQL** — do not mock the database layer
- Use the shared infrastructure in `Dynamicweb.IntegrationTests.Common`
- Mark with `[TestCategory("Integration")]` if the project mixes unit and integration tests

---

## SQL Conventions

- **Always bracket-quote** SQL identifiers: `[TableName]`, `[ColumnName]`
- Escape literal `]` inside a name as `]]`: `[My]]Table]`
- **Never use `SqlEscapeInjection`** helper methods — bracket-quoting is sufficient and correct
- Parameterise all user-supplied values with `SqlParameter` / `@param` syntax

```csharp
// Correct
var sql = $"SELECT [ProductId], [Name] FROM [EcomProducts] WHERE [ShopId] = @shopId";
cmd.Parameters.AddWithValue("@shopId", shopId);

// Wrong — do not use SqlEscapeInjection
var sql = $"SELECT * FROM {SqlEscapeInjection(tableName)}";
```

---

## C# Style

- Expression-bodied members for single-expression properties and simple methods
- `var` for local variables when the type is obvious from the right-hand side
- `private readonly` fields; use `field` keyword (C# 14) where available
- `record` types for immutable value objects
- `sealed` on classes that are not designed for inheritance
- Prefer `string.IsNullOrEmpty` / `string.IsNullOrWhiteSpace` over manual null + length checks
- Use `ArgumentNullException.ThrowIfNull(param)` (.NET 6+) instead of manual null guard

---

## File & Project Organisation

- One top-level public type per file; file name matches type name
- Nested types are allowed when they are implementation details of the containing type
- `GlobalSuppressions.cs` for assembly-level suppressions
- `Properties/` for `AssemblyInfo.cs` if needed (rare — most metadata is in `Directory.Build.props`)
- `Updates/` for SQL migration scripts (`.sql` files, embedded resources)

---

## Package & API Compatibility

- Current package version: `10.25.0-PreRelease`
- API compatibility baseline: `10.22.9` (validated automatically in Release builds via `PackageValidationBaselineVersion`)
- This library follows SemVer and is consumed by external developers — **breaking public API is not allowed**
- Never remove or change existing public member signatures
- Add overloads instead of adding optional parameters to existing methods — optional parameters change the call-site signature and can break callers
- When a method is superseded, mark it `[Obsolete("Use XYZ instead.", error: false)]` rather than deleting it
