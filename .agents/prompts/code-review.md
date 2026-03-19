# Prompt: Code Review

Use this prompt when reviewing a pull request or diff in Dynamicweb10.

---

## Instructions for agent

Review the provided diff or branch changes. Work through each checklist section below and report findings. For each issue found, cite the file and approximate line number.

---

## Checklist

### Correctness
- [ ] Logic is correct and handles edge cases (nulls, empty collections, boundary values)
- [ ] No silent swallowing of exceptions without logging
- [ ] Async/await used correctly — no `.Result` or `.Wait()` blocking calls
- [ ] No race conditions in singleton services with mutable state

### Nullable Safety
- [ ] Nullable reference types annotated correctly with `?` where appropriate
- [ ] No `!` null-forgiving operator used without a justifying comment
- [ ] Null-conditional operators (`?.`, `??`) used instead of null guards where idiomatic

### SQL & Security
- [ ] All SQL identifiers are bracket-quoted: `[ColumnName]`
- [ ] No `SqlEscapeInjection` usage
- [ ] All user-supplied values are parameterised — no string concatenation into SQL
- [ ] No secrets or connection strings hard-coded

### API Compatibility
- [ ] No public member removed or signature changed (SemVer — external developers code against this library)
- [ ] New parameters added via overloads, not optional parameters on existing methods
- [ ] Superseded methods marked `[Obsolete("Use XYZ instead.", error: false)]` rather than deleted

### DI & Architecture
- [ ] New services registered in the correct `DependencyProvider`
- [ ] Service lifetime (Singleton/Transient/Scoped) is appropriate
- [ ] No `IServiceLocator.GetService<T>()` call where constructor injection is feasible

### DataIntegration Providers (if applicable)
- [ ] Provider extends `BaseProvider` and has all three required constructors: `Ctor()`, `Ctor(string)`, `Ctor(XmlNode)`
- [ ] `[AddInName]` and `[AddInDescription]` attributes present
- [ ] Source readers and destination writers are disposed correctly

### Ecommerce (if applicable)
- [ ] Price calculations go through `Dynamicweb.Ecommerce.Prices` — no manual arithmetic on prices
- [ ] Order state changes use the correct workflow transitions
- [ ] Multi-currency and VAT implications considered

### Tests
- [ ] New logic has corresponding `[TestMethod]` coverage
- [ ] Integration tests do not mock the database layer
- [ ] No test-only code left in production source

### Build
- [ ] Code compiles for both `net10.0` and `net8.0`
- [ ] No new `#pragma warning disable` without a comment
- [ ] `GlobalSuppressions.cs` not used to hide real issues

### Style
- [ ] File-scoped namespaces used
- [ ] XML doc comments present on new public members
- [ ] No backwards-compatibility stubs for removed code (just remove it)

---

## Output format

Report findings as:

```
### [ISSUE|SUGGESTION|PRAISE] — <file>:<line>
<description>
```

End with a **Summary** section: overall assessment (Approve / Request changes / Needs discussion) and the top 1–3 things to address.
