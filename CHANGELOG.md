# Changelog

## [v1.23.0] - 14-09-2023

**Swift v1.23.0 requires DynamicWeb 9.15.13 or newer**

## Bugfixes
* Cart: Missing product image in summary step when using inline payments in OrderSummaryOrderLineItem.cshtml
* Checkout: Voucher code: Add eventlistener for mouse text paste (oninput) in VoucherForm.cshtml
* Customer Center: Manage Users: User address doesn't use address format
* Customer Center: Remove link when empty on CustomerOrderDetails, OrderDetails
* Download cart: calculate orderlines count correctly in the mini cart
* General: Cookie missing translation
* General: Updated DW10 project file - SwiftDw10.csproj
* General: Cart, Quantity field is showing stock not the amount added to cart. OrderLineItem, Always use GetDouble("Ecom:Order:OrderLine.Quantity") - No stock hack
* Integration Customer Center - Invoices tag is wrong in template. It should be Ecom:IntegrationCustomerCenter.Invoices.Link and not Ecom:IntegrationCustomerCenter.Invoice.Link
* Integration Customer Center: Fixes:  Fix broken Paging links, CreditList, InvoiceList and OrderList and  request external PDF broken
* Integration Customer Center: Fix order price according to ERP currency in CreditList, InvoiceList and OrderList
* General: Add authorization token on _live-product-info.js
* General: Support external images - StartsWith  " / Files / " for product image assets
* General: Static variants: Shows language versions of the variant groups. Fixed by Correct sql for EcomVariantGroups selection
* Itemtypes: Employee - Text not placed next to image - Employee anchor link
* Itemtypes: Buttons & location maps - Fix Anchor links
* Itemtypes: Megamenu & Naviation - Hover underline not shown correctly in Firefox - Nav spans remove "align-middle"
* Itemtypes: ProductListFacets & ProductListSorting - Fix sorting when default is overriden on paragraph settings
* Itemtypes: Swift_ProductListFacets.cshtml -  Improve behavior, facets should not collapse after selection 
* Itemtypes: Add to cart - Improve behavior , do not resize qty field & reset Qty field
* Itemtypes: OrderEmail - Orderline image set to 45px
* Itemtypes: VerticalAndBreadcrumb navigation - Fix Product list breaks alignment, set navbar width correctly
* Itemtypes: Add to cart component - moved data-intersect element outside of content
* Itemtypes: Selected facets icon from cross to checkmark
* Itemtypes: On rows add missing space in 1ColumnComponentEdit, 2ColumnComponentEdit, 3ColumnComponentEdit, 4ColumnComponentEdit 
* Itemtypes: Search: Number of results doesn't match, Fixed by adding IsVariant=false to the product search query
* Itemtypes: Row 2Columns. Use UrlPathEncode for the background image link
* Itemtypes: Article filters: Options not visible on Iphones/Ipad. Fixed by adding textContent to options for iOS 10+
* Itemtypes: Accordion anchor link moved bottom and positioned absolute
* Itemtypes: Button shape - Fix  Add to cart button shape doesn't follow Branding when Small and Large button
* Itemtypes: Search: Hide divider, when only content search
* Itemtypes: When using themes that has uppercase letters, articlelists does not work. Fix on Swift_ArticleList and List.cshtml
* Itemtypes: ProductListItemRepeater, Fix missing spacing/grid gap when clicking the load more button
* Itemtypes: Do not include brackets in facets when not needed on RelatedProductsList, ProductListFacets and ProductListSelectedFacets
* Itemtypes: ProductListItemRepeater, Header info disappears when you refresh after Loading products, fix by never set GroupID through url
* Itemtypes: ShortDescription, fix validation and remove unused settings and variabels
* Itemtypes: ProductListGridView, ProductSpecification, RelatedProductsList changed sizes for the color images so it is aligned
* Itemtypes: ProductDetailsImage Thumbnail view in bottom option is larger and flexes if n items > 12 
*  Itemtypes: ComponentSelector, ProductListItemRepeater, ProductListComponentParagraph, ProductComponentParagraph, ProductSliderComponent and ProductGridComponent: Lookup correct pageid
* Itemtypes:ProductAddToCart, Support NeverOutOfStock for unit options
* Itemtypes: MegaMenu, ProductDefaultImage add UrlEncoded
* Itemtypes: ProductStaticVariants, Variant options doesn't show the correct Variant display type
* Itemtypes: ProductListGroupPoster, fix path when / files is missing

## Changes
* Itemtypes: Specification tables: removed default stripes + tighten up design
* Itemtypes: ProductSliderStandard, display arrows properly on mobile and tablet
* Itemtypes: UserAddressEditFormatted, UserProfileEditFormatted - Set address 2 field as optional. Address 2 is required ( which it should not ) when format addresses is used

## Added
* Checkout: Add address format to checkout handler templates
* Itemtypes: Product Detail media - Possible to show thumbnails on left side or right side in ProductDetailsImage
* Itemtypes: support 3D/2D models files in ProductDetailsMediaTable
* Itemtypes: Possible to add an image file path on a hex color field in Variant group option. Supported on these itemtypes RelatedProductsList, ProductListCompactView, ProductListGridView, ProductSpecification, ProductListListView and ProductListSelectedFacets
* Itemtypes: Download publications button for Product Detail Page and Download cart (Part 1 - Further work is needed on this & Requires Publications Licence)
* Itemtypes: ProductDetailsImage, ProductDetailsGallery. Possible to disable getImage and lazy loading. **( Be aware by disabling getImage you will get the raw image, which can affect the performance. Therefor, it is not recomendend to remove getImage )**
* Itemtypes: ProductListFacets add checkmark-icon on facets when a file path is used in the value for Variant color option 
* Itemtypes: Email Orderlines + Summary ( Part 1 - awaiting further fix from backend. Not recommended to use yet)

## Removed
* Itemtypes: Remove country depreciation on Swift_Preferences. In order to be DW10 compatible

# v1.22.0

## [v1.22.0] - 29-06-2023

DynamicWeb proudly presents Swift 1.22.0 (Q2-2023), which runs on DW version 9.15.9. This introduce  Stock and CSS Swift tool, The main headlines for this release are:

## Present proper information for the visitors

### Anchor links
On a CTA buttons we introduce anchor links, which can link to another location either on the same page or another page. This helps the visitors to jump to a specific area, without scrolling too much and gives the visitor the proper information immediately. 

### Related articles

Use Articles to engage visitors with updates on the company, relatable stories and it is a free marketing platform to promote products on the websites. As an addition to the articles we introduce related articles. On an article page it can be relevant to show some specific articles that are related to that page.

The related article can be based on 
* Article category 
* Article collection tags

![alt text](https://doc.dynamicweb.com/Files/Images/Swift/RelatedArticles-tags.png)


## Google Analytics & Tag Manager - Tracking 

Google Analytics 4 and Google Tag Manager are supported in Swift, which will enable you to see e.g. Monetization on E-commerce purchases, Engagement events & conversions. Tracking is enabled when accepting DynamicWeb's cookie manager. However, when using a third party cookie manager this could sometimes be an issue.
Swift has reimplemented how cookies and tracking scripts are handled. When the Dynamicweb Cookie manager is disabled, Swift will allow tracking (this is changed compared to previous versions) which makes it possible to use Google Tag manager to inject external cookie scripts like Cookie Information and Cookiebot and let them handle when and how Analytics are loaded and how client side cookies are handled.

![alt text](https://doc.dynamicweb.com//Files/Images/Swift/Cookie-manager.png)


**Info**
* When using a third party cookie manager you can disable DynamicWeb's cookie manager under Settings / Web Http / Cookie Manager

## Inventories & Stock notifications
On the product detail page, product inventory can be an important information to show to the visitors, to let them know that the product is in stock. With this information we have extended som extra functionalities such as Stock state, Back in stock notifications email, Stock location overview. 

### Stock state
The labels on the Stock state were predefined in Swift. However, we now support the Stock State in DynamicWeb, where you can define your own labels on the stock levels based on its stock state. This allows you to provide your own message to the visitors. An addition to that it is possible to hide inventory number from stock component and only show the stock state label

* Create own labels based on stock levels
* Inform your visitor how many items that are left


![alt text](https://doc.dynamicweb.com//Files/Images/Swift/Stock-states.png)


### Back in Stock notifications

Notify the visitors when a product is back in stock with the back in stock notification component. This aims to sustain the initial visitors interest by coming back to the website and purchase the item, because it enables an alert and expectation of that the items will be restocked in the future.

* Aims to sustain the initial visitors interest
* With the back in stock notification you can create and design a system email and notify the visitors through email Marketing

![alt text](https://doc.dynamicweb.com//Files/Images/Swift/Back-in-stock-notification.png)


### Stock location overview

Companies with multiple stock locations can now be presented in Swift. With the Stock location component
 it is possible for the visitors to get an overview over where the item is in Stock. 

* See if the item is in stock
* An overview over where the item is available
* Search for a specific location based on Location name and address

![alt text](https://doc.dynamicweb.com/Files/Images/Swift/Stock-locations-overview-1.png)


## Stand out with CSS Swift tool

Do you want to add your own design to standard? With Swift CSS tool you can add the customers design on the commerce projects. This can be done by adding Class name and CSS code through the Swift CSS tool concept, where the css code can be reused. This offers developers to add some ' decorations ' e.g. rounded corners, shadows or use standard bootstrap utilities on top of our standard elements.

* Add CSS without editing the Swift standard item types
* Make the CSS globally and reuse the code
* Part 1: Basic functionlity implmented on row and TextAdvanced
* Part 2: Micro templates + all relevant paragraphs (Upcoming)


![alt text](https://doc.dynamicweb.com/Files/Images/Swift/Swift-css-tools.png)


## Database types

We heard your struggles with the database when starting a new project! Therefore, we present two different database types. 

**Database - with demo data:** 
* This database includes all the Swift content pages and ecommerce products data

**Database - with no ecommerce data:** 
* This database includes all the Swift content pages, but with no ecommerce data such as products, variants, related products. It is also been cleaned for Product fields and category fields and much more. *(Available the next couple of days)*

**(Find the database types [here](https://doc.dynamicweb.com/downloads/swift#sideNavTitle1-1))**


## Improvements

### Content 
* Support image quality setting from backend administration
* Do not load AOS when not needed
* Forms for Editors  support date field
* Disable search for itemtype fields that should not include in content search

### Ecommerce
* Selected variant info when using hex code or variant option image
* Product component container

#### Ecommerce changes
* Support Product variants on product slider

### General
* Address format

### Removed
* Itemtypes: ProductCatalogDetailApp, two item types with the same system name

### Bugfixes from v.1.21.0 to v1.22.0

* Checkout: Cartv2, no validation or validation message are not shown on info step
* Checkout: Cartv1, missing region field
* General: Account info, doesn't update the field format when changing country
* General: W3c validation warning at master
* General: Lighthouse issue, error parsing link header 
* General: W3c validation warning at master
* General: Order Delivery address does not have a region value
* General: Broken links when 'Do not add base href' is enabled
* Itemtypes: Variant selector modal, Default variant isn't selected
* Itemtypes: Supported formats in ProductDetailsMediaTable, ProductDetailsGallery and ProductDetailsImage are case sensative
* Itemtypes: Email Image not including host in img src
* Itemtypes: Navigation W3c error
* Itemtypes: Media Table and Gallery generate error in Visual Editor on component
* Itemtypes: Media table has stretched link, issues on Safari
* Itemtypes: Product component, Back in stock notifications for Product Details
* Itemtypes: Product compoent, Stock location
* Product list: Not possible to scroll the page after a facet is selected (Ipad)

**SwiftDW10**
* Wrong placement of text in Article header
* Number input field is validated and can't be saved with 0
* Articles: Not possible to create article tags in DW10 (out of the box)
* Error compiling template Designs/Swift/UserManagement/Addresses/AddAddress.cshtml
* Dynamicweb.Ecommerce.WebAPI is depricated

## [v1.21.0] - 27-04-2023

## Bugfixes
Itemtypes: Navigation, hover underline doesn't disappear 
Itemtypes: Mega menu, the menu items doesn't align with 1. level 
Itemtypes: Preferences, the menu triggers hidden row 
Itemtypes: Article list, slider indicators are not based on number of articles
Itemtypes: Article list, slider item 1 doesn't have a left border and shadow.
Itemtypes: Search, text is not wrapped
Itemtypes: Sliders, Selected variants in shown wrong sort order
Itemtypes: Media, Media Gallery, Media Table: No fallback to first frame if video doesn't have a thumbnail
Itemtypes: ProductDetailsImage, Fix default image shown twice
Itemtypes: Favorites, icon not updated and JS error when add/remove. Re-work and simplify the favorites markup
Itemtypes: Variants with Live Product Info not updating properly
System emails: Background color not rendered in emails
General: Related product list, Quantity selector UI broken at mobile. Set min width on the quantity selector
General: Input and stock are strings and not floats
General: Ecommerce badges, code rendered when no badges
General: Branding, buttons lacks default paddings
General: Performance optimization: ProductList Current.Items logic
General: Performance optimization: Product items part 1 - (ProductGridComponent, ProductSliderComponent, Product sliderStandard, ProductComponentSlider, RelatedProducts)
General: Performance optimization: Product items part 2 - (ProductAddToCart, ProductAddToDownloadCart, ProductAddToFavorites, ProductAddToQuoteCart, ProductBadges, ProductDefaultImage, ProductDetailsImage)
General: Performance optimization: Product items part 3 - (BackInStockNotification, ProductDownloadData, ProductHeader, ProductLongDescription, ProductNumber, ProductPrice, ProductPriceTable, ProductShortDescription, ProductSpecification, ProductStaticVariants, ProductStock, ProductStockLocations, ProductVariantSelector)
General: Performance optimization: Article list
General: Performance and Respect responsive and adaptive settings in navigation and megamenu
General: Cleanup and optimize how we add meta data for website settings and Page properties
General: SwiftDW10, Frontend error in Express buy
General: SwiftDW10, " Services does not exist " error in article lists
General: SwiftDW10, Country does not contain a definition for Name error when you try to add new address

## Added
Itemtypes: Support Anchlor links on the content paragraphs from Content/paragraphs/standard
Itemtypes: Product component, Back in stock notifications for Product Details
Itemtypes: Product compoent, Stock location

## Removed
Itemtypes: ProductCatalogDetailApp, two item types with the same system name

## [v1.20.0] - 30-03-2023

## Bugfixes
* Cart: Use parseInt in js numbers to secure correct calculation of stock state, avoid quantity suddenly changes to a different number 
* Cart: Country not submitted when address is changed
* Customer center: Quotes, use OrderType.Quote for the quote state filter, so it is possible to filter
* Customer Center: Favorites detail: Use ToStringInvariant the correct way
* General: Express buy, improve the check for when a product is out of stock (Filter out products with 0 quantity)
* General: Express buy, validate quote checkout page id to be bigger than 0
* General: Missing translations in cart
* General: Fix spinners on pageupdater
* General: Google Tag Manager,  Replace " , " with " . " on all prices for GTM
* General: Content search typo fix
* General: Support for pretty urls while changing facets on tablet/mobile
* General: Add ProductvariantId to query parameter, Added due to the fixes with Product slider / Grid view in order to show both Master and selected variants. (Requires also a correction in Content/Services/Related products slidergrid//Product catalog for View model - set default parameter isVariant to value empty. And go to Content/Product/Product catalog for View model set default parameter isVariant to value False)
* Itemtypes: Product slider / Grid, show slider settings, when set to slider layout
* Itemtypes: Product slider / Grid, improve description for the button label
* Itemtypes: Product slider / Grid, support MainProductId in load more request
* Itemtypes: Product slider / Grid view, wrong list of products when Load more is clicked
* Itemtypes: Product slider / Grid view. Support MainProductId in load more request. Wrong list of products when Load more is clicked
* Itemtypes: Product slider / Grid view. Empty list of products when load more is clicked, fixed by not adding  groupid, when linking to a productlist with selected products
* Itemtypes: Product slider / Grid view, better "View all" link generation
* Itemtypes: ProductListItemRepeater, remove bad " Button " html property. Fix validation error at product list
* Itemtypes: ThemeSelectorMini, handle multiple themes with same class name, avoid throwing an error
* Itemtypes: ProductDetailsImage, secure that the default image thumbnail is only rendered once
* Itemtypes: Favorites, Fix deleted favorite list redirects to 404 page
* Itemtypes: Product component slider, fix sorting for selected products
* Itemtypes: Product component favorite, hide favorites icon correctly, when variant modal
* Itemtypes: Megamenu viewport max-height w/ scroll
* Itemtypes: Navigation, Dropdown eventlistener changed to mouseenter / leave. Fix flickering dropdown
* Itemtypes: ProductListItemRepeater, Favorites and Variant selector, fix Variant selector modal error
* Itemtypes: Navigation/ Mega menu, dropdown toggle with link respect clickable
* Itemtypes: Impersonation, Use correct impersonation name
* Itemtypes: Mega menu naviation, clickable/unclickable menu items, fix when submenu type is auto

## Changed
* Itemtypes: Product slider/grid, improve the "Selected products" setting, Possible to show both master and variants
* Itemtypes: Product Variant selector,  Add "Nothing selected" option if a master product with no variant selection is shown
* Itemtypes: Slider, Switch grid to flex row on Swift_slider items

## Added
* Itemtypes: Related/variants list add to cart validation
* General: alternate hreflang update
* Itemtypes: Article list,  Possible to added context (tags) option e.g. when using article list as related article in article page
* Itemtype: PoductStockLocation. possible to show which location the product is in stock (Part 1). We will work further with this implementation


## [v1.19.0] - 24-02-2023

DynamicWeb proudly presents **Swift 1.19.0 (Q4-2022/Q1-2023)**, which runs on **DW version 9.15.2**. This introduce Article tags and filter options, Parcelshop in checkout supporting the Shipmondo provider, Template conversion to run on DW10 platform. The main headlines for this release are:

## Engage visitors with articles
Create your articles through Visual editor when creating news, blogs, campaigns etc. This is a way to **engage your visitors** with updates on the company, relatable stories and it is a **free marketing platform to promote products on the websites**.
As an addition to the articles we introduce Tags and Filtering, which can help **organise** the articles.  The **visitors can find the proper article they are looking for** through filters.

![alt text](https://doc.dynamicweb.com/Files/Images/Swift/Articles-tags-filtering.png)

* Use article tag collection to create groups collection with tags. The tags can be added to one or multiple articles that can be displayed on the article list as a badge.
* Use filtering based on the tags collections or article list categories
* Possible to Enable the load more button together with page size to showcase a small chunk of articles at a time to give better overview and control over the page
* The article tag collection filter works for only 1 article list. Having multiple article lists on the pages is possible but the filter will effect on all of them.

### Changes on the article list
* The article list layout is changed in order to have the right placement for the tag badge
* The article list shows the article list as default. If you need to set it back to only show the Article category this is still possible

## Content & marketing

### Open Graph
Open graph was available on products and the general website. On  this release it is now possible to control the Open graph information on a specific content page. By deciding which image, title and description you want to display when sharing a link of your content page on social media e.g. LinkedIn, facebook etc. **Highlighting specific articles, events or campaigns on social media.**
* Open graph makes the links more visual, eye-catching and rich on the social media feeds
* People are more likely to click on the shared links
* Fill in the page meta data: image, title and description to enrich the Open graph information

![alt text](https://doc.dynamicweb.com/Files/Images/Swift/Open-Graph.png)

### Custom fonts
Swift supports Google fonts. However, some branding websites want to use custom font on their websites that can define the brand and impression that the company wants to give. This allows you to have consistency across the different media and platforms

* Align the branding and design through the custom fonts throughout the website
* File extensions that are supported .tff, .woff, and .woff2 
* This is the *[Custom font setup guide](http://doc.dynamicweb.com/swift/setup-project/design/branding#sideNavTitle1-2-1)*

![alt text](https://doc.dynamicweb.com/Files/Images/Swift/Custom-font.png)

### Google Tag Manager
Swift support Google Analytics 4, where the ecommerce events are supported. That will enable you to see e.g. Monetisation on E-commerce purchases, Engagement events & conversions. If you do not want to use Google Analytics 4 directly. You are now able to connect with Google Tag Manager that gives the ability to install different types of tags. Google Analytics 4 is the tracking tool, while Google Tag manager is the mediator between your website and the tracking tool.
* Possible to add, change update own tags as needed for conversion tracking, site analytics
* Tags help social marketers group and categorise posts for flexible reporting on content and campaigns
* The GTM id can be added in Website settings

## Visitors ask for flexibility

### Parcelshop - Shipmondo provider
In the checkout delivery step, it is now possible to offer Parcelshop delivery using Shipmondo.
Parcelshop offers customers to select a specific parcelshop store near them, where their package can be delivered to. **This benefit customers who are not at home for home delivery**. Shipment is quick and simple and it also benefit the extended opening hours, offered by the collection point.

* Expand your range of services in your ecommerce webshop by offering customers shipping to a parcelshop
* Parcelshop can increase customer frequency and increase sales due flexible delivery hours
* In the Shipmondo account it is possible to set up carriers e.g. GLS, Postnord, Dao, Bring and UPS
* Use DynamicWeb shipping fee matrix to set up prices

![alt text](https://doc.dynamicweb.com/Files/Images/Swift/Shipmondo-deliverystep.png)

### Updated checkout flow
* In order to include parcel shop, we needed to change the cart flow. 
* New checkout templates are created marked as v2, since we needed to use customer info fields, instead of deliver info fields for e.g. anonymous users.
* The old templates still exist so it is still compatible if you are upgrading your Swift.
* But if you need to use Parcelshop in your solution this needs to be setup
* The new released database has already the setup for the new checkout flow

## Decrease implementation time 
Product component gives the flexibility to build own product list and product detail page through Visual editor, which can decrease the implementation time, since you can configure it yourself using the components. You can also create your own custom components using your own template together with the Swift product components.

### Additional elements for Product Component

* **Product name** - Possible to define h-tags. e.g. < h1 >, < h2 > 
* **Product image** - Possible to show alternative image on hover based on the assets category groups. this give a more dynamic look and feel when hovering over the product list
* **Product slider** - Possible to create own custom product slider through components. Deciding which information it should contain.
* **Product variant selector** - Define the layout of the variant selector. If you want to use buttons or dropdown selector for the specific category groups. It also support the new functionality in DW called **variant group display type** to define if the image should look on Product variant image, variant option hex code, variant option image, 
*  **Add to cart** - On the Unit selector the stock information is shown in the dropdown.  Furthermore, stock validation and minimum quantity step validation are also added to the component.

![alt text](https://doc.dynamicweb.com/Files/Images/Swift/Product-VariantGroupOptionsDisplayType.png)

## System emails in visual editor
Build your email set up in Visual editor, when creating emails for your website when e.g. building emails for  create account and order receipt. This allows you edit your emails in an easy and visual manner and implement your own custom email elements.

### Mails created

* **Create account** and **verify mails** through extranet app
* **Invite users** send an invite user email trough the user area
* **Forgot password** - possible to send a reset a password mail, when a user has forgotten their code
* **Welcome email** - send through marketing email flow, so user can set a password on the new website
* **Order confirmation mail receipt**, set on cart app (still under developement)

The system emails are created and setup, but not selected on the different app module, we still run with the regular email setup.

![alt text](https://doc.dynamicweb.com/Files/Images/Swift/System-emails.png)

## Reorder products
In customer center my order page, it is possible for customers reorder products from an earlier purchase. This is an easy way to let customer get the product they need, without any hassle and enhanced the customer experience. An addition to this reorder functionality, an extra step is added where users can get an overview over the order list for what is in stock, or if they want to add or edit the quantity before adding it to their cart.

![alt text](https://doc.dynamicweb.com/Files/Images/Swift/CC-Myorders-Reorder.png)

## Improvements & Maintenance

### Content 
* TinyMCE richtext editor possible to support internal links
* Accent color - support on Poster, image  slider, features, text and image, header, text
* Row settings - medium height padding options 
* Additional breakpoints for the entire website
* Support grid css classes to define field layout

### Ecommerce
* Possible to add both Master product  and product variant to favorite list
* Price informative, support price informative from the price matrix for example showing Recommended Retail Price information
* Facets - Decide how many should stay open vs. collapsed
* Specification itemtype - support new layout accordion
* Group list - possible to take sub groups of current group id

## DW10 Conversion
Swift has rewritten the razor templates so it is suitable to run both DW9 and DW10. This gives the opportunity to keep working on Swift projects in the future. Going from DW9 (.NET 4) to DW10 (.NET 7) gives some issues on the templates, since some elements are deprecated. The focus has been on the code that is not easily converted trough the DW10 template converter. 

**Focus areas on Swift**
* Rewritten helpers are deprecated in Razor​
* System.web and HttpContext is deprecated in .NET 7
* Any use of .NET 4 framework only APIs is deprecated​
* New razor parser in .NET 7 with minor changes to execution

![alt text](https://doc.dynamicweb.com/Files/Images/Swift/Swift-dw10.png)

## Removed

* Product info itemtype is removed
* Tiny slider is deprecated, we are using Swiffy slider instead  - Product detail image, Product media gallery, product slider

# v1.18.0
## [v1.18.0] - 08-02-2023
**Swift version 1.18.0 release requires a Dynamicweb version 9.15.1**
The quarterly release Q4-2022/Q1-2023 with a new database, is postponed. We are fixing the last issues on DW10 template support, parcelshop and System emails.

##  Bugfixes
* Cart: Pressing Enter key on product list submit and return the Cart Count. Better way to preventDefault on _cart.js
* Cart: On devlivery step, add default disabled state to date field
* Customer center: Check if logged in while in the visual editor, fixing template error in VE.
* Express buy: Warning message on orderlines that contains a deleted product
* General: JS encode product name and variant name for javascript, so sepecial characters is accepted when using g-tag
* General: Set default country if user country is empty for AdressÚser, EditProfile and ViewProfile
* General. Fix date format at 00:00 on RmaCreateNewRequest, RmaHistory, RmaInfo, CustomerOrderDetails, CustomerOrderViewSearchList, CustomerQuotesList, OrderDetails, OrderListWidget, OrderViewSearchList and QuoteDetails
* General: Fix csproj file
* General: Fix prices in OrderDetails, Orders, OrderLineItem, orderSummary and OrderSummaryOrderLineItem
* General: Search phrase lost after clicking Load more, Product repeater search term. fix on ProductListCompactView and ProductListItemRepeater
* General: In Cart and Customer Center fix stretched product images
* Integration Customer Center: Preview does not work at Invoice and Credit page
* Integration Customer center: Make pagination items wrap correctly
* Itemtypes: TextAdvanced, Button aligned with content 
* Itemtypes: Product list, load more button, re-initialize the scroll methods at the correct time
* Itemtypes: Specification, Reintroduce good typo to show theme selector
* Itemtypes: Specification, fix group headers for Missing padding
* Itemtypes: Animation On Scroll use default offset + mirror = false
* Itemtypes: Product components, variantselector js update, to disable add to cart when selection not completed on _variantselector.js
* Itemtypes: Group slider, images are no longer hidden if group don't have group image
* Itemtypes: Feature, fixed bad alignment when no subtitle
* Itemtypes: Navigation and mega menu - Dropdown offset 0 to fix flickering
* Itemtypes: Navigation and Mega menu, Dropdown item no longer chopped and mega menu stays no more open after page loads
* Itemtypes: Page settings, Remove irrelevant title field in Page item type
* Itemtypes: Navigation on mobile - Fixed minor alignment error
* Itemtypes: Navigation Off-canvas, now clickable if device rendering is set to responsive and configured for both for desktop and mobile
* Itemtypes: Search, Make sure that we do not request nothing
* Itemtypes: Fix add to cart component error, ProductSliderStandard and ProductAddToCart
* Itemtypes: Navigation Off-canvas menu, remove extra scrollbar
* Itemtypes: Pass the VariantID in addition to ProductVariantId, Fixing that variant is not flagged/removed as favorite
* Itemtypes: Product Specification, increase field limit on field display groups
* Itemtypes: Product components, slider fix wrong area settings reference, giving a template error
* Itemtypes: Related product list, set Field display group limit to 250 instead of 25
* Itemtypes: Preferences, on language selector show both language display name and native name
* Itemtypes: On EmailBase remove svg icon, which give a 504 validation error 
* Itemtypes: Product component, VariantSelector fix broken variant modal selector

## Changed
* Itemtypes: Article list design layout
* Itemtypes: Product group header, remove the node-Active check for the Group header titles

## Added
* General: Add demo article recipes images to git
* General: Support for autotests, ids on navigation
* General: Support Google Tag Manager, GTM-id can be added in website settings
* General: Default template for forms for editors, Support grid columns
* General: Stock validation on OrderLineItem, Cart, ProductAddToCart, ProductStock and miniCart
* Itemtypes: Support verify command for system email on Swift_EmailButton
* Itemtypes: On articles possible to use create article tag collections and use Article tag filters and  category filters
* Itemtypes: Specifications: Possible to hide fields with 0 and 0.0 values
* Itemtypes: Add vertical alignment for ProductComponentParagraph
* Itemtypes: Article list, support empty states and clear filtering
* Itemtypes: Product component, ProductVariantSelector support display types

## Removed
* General: Removed paragraph preset images for  the group called 2 column
* Itemtypes: Removed title fields from row item types


# v1.17.0
## [v1.17.0] - 21-12-2022

## BugFixes
* Checkout: When using inline payment step missing information for breadcrumb, summary and orderline image
* Checkout: Delivery date checkbox, moved to correct group to prevent hiding itself
* Checkout: Google address causes errors in the console. Use Assets loader to load Google places
* Customer center: Fix link on Dashboard the order page doesn't open on My orders page
* Customer center: Address State field is not auto populated after selection. Remake support for both Region and State in Google autoplaces
* Customer center: In Favorites lists, change the text to Products, when only 1. Get count from proper list
* Express buy: The Add to cart button should be disabled if products are not in stock.
* General: Null check - eCommerce badge
* General: Custom fonts, fonts folder not created when it doesn't exist. Fix by including fonts folder
* General: Custom fonts, change condition to not assume custom font field is present
* General: Custom Sitemap Missing includeFolderAndHidden = True, update to not include debug info
* General: In Page properties settings - there No difference between the 2 header position settings 
* General: Validation error in Static variants. Correct auto-test hook implementation
* Itemtypes: Poster, position absolute the anchor when there is no button label and stretched link is selected
* Itemtypes: Feature, alignment if no icon is selected
* Itemtypes: Slider, Ratio and fill - Undo prev changes. Issue with not enough room for both headline, subtitle and button on mobile
* Itemtypes: Slider, image is set to position absolute when " fill " ratio is selected
* Itemtypes: Navigation, when using a page of type “Shortcut” the template breaks - Add null check
* Itemtypes: Navigation, a clickable 1st level navigation node will not redirects to #
* Itemtypes: Search, Rounded edges are gone
* Itemtypes: Search, Products with special characters break type ahead. Remove broken html encoding code
* Itemtypes: Product component Add to cart, UI improvements on units selector
* Itemtypes: Product component Add to cart, initialize Scroll on PageUpdater success
* Itemtypes: Product component Add to cart, background color fallback for when using themes with transparent background
* Itemtypes: Product component Price, normal price doesn't align
* Itemtypes: Product component price alignment issue fix
* Itemtypes: Product Facets, fixed modal overlay bug when screen size is below lg
* Itemtypes: Product Specification, simplify the elements and correct the alignment
* Itemtypes: Row markup still rendered and padding class
* Itemtypes: Removed useCache="False" from item type xml, legacy xml code which shouldn't be there anymore

## Changed
* Itemtypes: Swift_Preferences, change to language selector, show page even if it is hidden in navigation
* Itemtypes: Removed setting only showing favorites for master product, this should be a part of the existing setting ShowAddToFavoorites

## Added
* General: Template conversions, so it is compatible for both DW9 and DW10
* General: TinyMCE support plugin dw link, in order to use internal links on the rich text editor
* General: Updated Themes preview page, possible to show the accent color
* Itemtypes: Product component slider, possible to design own product slider using product components
* Itemtypes: On the Product Specification an accordion design layout applied as an extra option
* Itemtypes: Product image component - possible to show alternative image on hover based on selection from the asset categories

# v1.16.0
## [1.16.0] - 05-12-2022

## Bugfixes
* Customer center: Fix RMA null check and image alt and path
* General: Under Swift tool/Design Possible to select Branding page again, missing restrictions
* General: Show the image format clearly on the panel for Assets.cshtml for Digital Assets Portal
* Itemtypes: Fix App layout setting
* Itemtypes: AddFavourite buttons does not have discernible text, Added text to buttons + Added aria-hidden to icons
* Itemtypes: Search, Fix markup in search result in ProductSearchDropdownResponse and  Swift_SearchField
* Itemtypes: variant component, more flexible static variant sizes, so images does not exceeds column
* Itemtypes: Check if variantid element exists, since the VariantSelector breaks if the element is not found in VariantSelectorand Swift_ProductVariantSelector
* Itemtypes: Use PageUpdater when changing units, so the price with be reflected for Swift_ProductAddToCart and Swift_ProductPrice
* Itemtypes: Make Rows themes visible again
* Itemtypes: Added labels for color facets
* Itemtypes: EcommerceBadge, use Math.Round instead of Math.Floor for badge percentage rounding, to avoid rounding error
* Itemtypes: Manage empty product slider with advanced service page on ProductSlider
* Itemtypes: Use linkType2 instead of linkType for Swift_TextAndImage
* Itemtypes: Row height - added missing "medium" in value name
* Itemtypes: Facets, relevance sorting should be empty string for Swift_ProductListCompactView, Swift_ProductListGridView, Swift_ProductListItemRepeater, Swift_ProductListListView, Swift_ProductListSelectedFacets
* Itemtypes: Blockquote, fixed quotation mark wrong position, for Swift_Blockquote
* Itemtypes: Input group - Input field rounded if button is set to rounded for VariantSelector, VoucherForm, DownloadCart, Swift_ProductAddToQuoteCart, Swift_ProductDetailsInfo, Swift_ProductDownloadData, Swift_ProductListCompactView and Swift_ProductListListView
* Itemtypes: Swift_ProductDetailsImage, ensure primary image is loaded if variant image pattern is different than main product
* Product list: Better alignment for Swift_ProductListCompactView and ProductListListView

## Changed
* Itemtypes: Theme selector accent color in Swift_ThemeSelectorMini
* Customer center: My orders, reorder adding extra step with express buy, improving user flow

## Added
* Customer center: Support for Saved Cards e.g. for  payment providers EbizCharge
* General: Support open graph for pages using meta data in Page properties, Title, description and image
* Itemtypes: Add to cart component, Support stock state on uniit selector
* Itemtypes: Add the possibility to use Accent color for content item types Text, Text and image, Feature, Section header, content slider and poster (Accent color was only available in TextAdvanced beforehand)
* Itemtypes: facets, define how many groups should be open from the start
* Itemtypes: Support informative prices on price component
* Itemtypes: Row component - Medium row height

## Removed
* Itemtypes: Remove ProductInfo itemtype + template. Since we will focus on product component instead. ProductInfo itemtype will no longer be supported

# v1.15.0
## [1.15.0] - 27-10-2022

## Bugfixes
* Checkout: Hide sign in button is sign in page field is empty
* Checkout: Fix date format when using flatpickr - remove value from input settings it with js
* Customer center: Updated OrderDetails.cshtml for correct Order Id tag name on OrderDetails.cshtml
* General: W3C validation error, Remove self closing tags 
* General: Open graph, fix wrong meta tags and remove deprecated twitter:image:alt 
* General: Add disabled property to quantity selectors if AddToCart buttons have on RelatedProductList, VariantSelector, Swift_ProductAddToCart, Swift_PtroductDetailsInfo, Swift_ProductListCompactView and Swift_productListListView
* General: Outlined item type icons 
* General: Fixed validation errors, Element div not allowed as child of element button in this context
* General: add method attribute to login form
* Itemtypes: Mega menu, remove duplicate ids
* Itemtypes: Swift_Slider.cshtml, fixed possible merge error leaking code to the view
* Itemtypes: Preferences, Butten not translated correct
* Itemtypes: Product specification, added null check in comma list
* Itemtypes: Article list publish date is not rendered + added missing Schema.org microdata
* Itemtypes: Product List Facets and Product List Selected Facets: Fixed missing translation
* Itemtypes: Article header, fixed broken default user icon when there is no user image
* Itemtypes: Product Group List, Swap icons to horizontal alignment icons on the settings
* Itemtypes: Changed name from GENERAL to Item type name + settings.
* Itemtypes: Related product list, Quantity input field is broken in list, set the width of the column based on the width of the button
* Itemtypes: Media, remove documents from the slideshow loop in modals
* Itemtypes: Slider, ratio icon: Switch original to fill
* Itemtypes: Enable Static Variants on ProductDetail and ProductComponents
* Itemtypes: typeahead, adjusted delay in typeahead dropdown + removed disabling of input fields
* Itemtypes: Product components - Product list item repeater - Removed double links
* Customer center: Null check on RMA's default group id
* Itemtypes: Product component, Product Add To Cart - Buttons now have same sizes
* Itemtypes: ProductComponentEdit and ProductComponentParagraph - No theme is set to default theme
* Itemtypes: Fixed links in footer with subpages
* Itemtypes: Ecommerce badges, Optimize performance
* Itemtypes: Slider - Removed padding from slider when theme is selected, and removed padding for every slider item
* Itemtypes: Search icon is now back to its usual size, it was suddenly 14x14  instead of 21x21
* Itemtypes: Navigation and mega menu, fixed dropdown not rendering when full-width row is selected

## Changes
* Repository: Reorganize repository settings

## Added
* Generel: Possible to select own custom fonts in Swift Branding. [Read the set up guide](https://doc.dynamicweb.com/swift/setup-project/design/branding#sideNavTitle1-3)
* General: Added option to disable wide breakpoints in website settings. Define if you want to have entire website to be wide width or narrow width
* General: Add Authorize.Net payment provider templates
* General: Correct settings for user and group types in User area
* Itemtypes: Product group slider, added option for current group id + hide output if ! count > 0
* Itemtypes: Units selector added on the add to cart component - Part 1
* Itemtypes: Product component, Header - added heading levels to product components
* Itemtypes: Article header, Added space around setting
* Itemtypes: Allow main product to be added to the favorite list on Product List Grid View, Product Slider, Default Product Image, Product Details Info, Product List Compact View, Product List List View, Product Add To Cart, Product Add to Favorites

## Remove 
* Itemtypes: Remove Carousel from Articles

# v1.14.1
## [1.14.1] - 28-09-2022

## Disclaimer
* Tiny Slider is deprecated and has been removed from Swift code base (_slides.js, _slider.scss, tiny-slider.js and all occurrences has been removed) 
* Itemtype Swift_Carousel has been removed (replaced by itemtype Swift_Slider that uses SwiffySlider) 

## Bugfixes
* General:  Hide cookie notice while in Visual editor
* General: Unfocused addtofavorites button after click
* General: Error in frontend if unit fields type is emptied, Extra null-check before using Substring
* General: Clean up images used for demo, move images to Swift Content demo folder
* General: Add /Fonts to .gitignore, move font files outside css folder
* General: Add correct alternate page for PDP and group pages
* Cart: Missing focus on Checkout buttons (accessability). Fixed outline issue on buttons
* Checkout: Calendar for select delivery date not working if selected and then other changes/selections are made. assetloader missing custom event if assetFound
* Customer center: My customers, Safari issue managing customers. Fix linked table rows
* Itemtypes: Removed unused code from logo
* Itemtypes: Logo, it should not be possible to set the width to -1px
* Itemtypes: Slider, empty rows should not output any code to the page. Wrap initialize within empty products if statement
* Itemtypes: Product group slider, borders removed from Product group slider
* Itemtypes: Video, Buttons do not have an accessible name (Lighthouse: Accessability). Added label to video player button
* Itemtypes: HTML validation: Duplicate ID in MegaMenu, fixed duplicate links in mega menu
* Itemtypes: Slider, missing focus on slider elements. Removed no-outline class
* Itemtypes: Row height, fix spacing for 1Column row
* Itemtypes: Off-Canvas, fixed menu icon misalignment
* Itemtypes: Off-Canvas, Added missing pointer for arrows
* Itemtypes: Off canvas, more distance between navigation menu and promotion image
* Itemtypes: Video, performance when using video (Lighthouse Performance) added preload property to video tags
* Itemtypes: Impersonation bar, preview when in Visual Editor Mode, in order to edit it
* Itemtypes: Product components, Product long description - Padding bottom is shown if there is no title
* Itemtypes: Blockquote, left border layout design is not visible if no theme is selected
* Itemtypes: Product components, Price, Better help description for themes field on pricing
* Itemtypes: Product list group poster, The poster height is the same for "Small" and "Medium" on mobile fixed min-height for mobile and aligned mobile/desktop min-height
* Itemtypes: Product list selected facets - Facets breaks into multiple lines and squished if to may facets are selected .Cleaned up facets list, added no wrap to labels
* Itemtypes: Product components, Add to cart. Possible to theme icon inside btn for favorite icon and default image
* Itemtypes: Product components, Add to favorites. Preview for visual editor mode is missing 
* Itemtypes: Product components - Buttons size alignment when there is no button label
* Itemtypes: Product Group List - Removed additional padding from pill-button layout
* Itemtypes: Product list group poster, the poster height is the same for " Small " and " Medium " on mobile .added min-vh-25 for small size + adjusted medium/large to min-vh-50/min-vh-75 + wrapped Title/Description in a condition
* Itemtypes: Product Download Data - Form field - Label disappeared when dark themed
* Itemtypes: Product components, Add to cart fix Border radius issue
* Itemtypes: mega menu, Image handler doesn't htmlencode space in image path, urlencode image path for Promotion Images 
* Itemtypes: Related product slider - theme is not applied to the row between the columns
* Itemtypes: Facets, mobile view button theming issue
* Itemtypes: Related product list headline is wrapped, fix grid issue
* Itemtypes: Mega menu, fixed missing group images and nav link not hoverble if set not clickable
* Product detail: product variant sector, Improve the in-active variant css
* Product detail: Related products list view and Specification. clean up and improve Tables so it is mobile friendly
* Product list: ProductlistCompactView and ProductListListView remove " product " class from product list items
* Product list: Product list view and compact view - Space around setting "none" works
* Product list: Compact view has error in modal when product has variant, Fix copy-paste code error

## Added
* General: Change template helper calls for DW10 compatibility 
* General: Remove ~ from master in links and change branding to work with httpclient that works on .net 4 and .net core for DW10 compatibility 
* Itemtypes: Breadcrumb doesn't work with content pages. Add folders and hidden pages and add link to breadcrumb markup
* Itemtypes: Off-canvas, Nav link clickable if the page is set to not clickable

## Removed
* Itemtypes: Swift_Carousel is removed

# v1.14.0
## [1.14.0] - 01-09-2022

Dynamicweb proudly presents Swift 1.14.0 (Q2-2022). This introduce Digital Assets Portal and Google Analytics 4, which can improve work process and possible to analyse and measure traffic on the website. The main headlines for this release are:

## Digital Assets Portal
Make the product assets and digital media assets available for download, which can help businesses to optimize their work process, by giving them a self-service website with downloadable product assets and media assets. 

### Includes these areas:
* **Digital Assets:** Possible to download media assets in different resolution that is not product related e.g. logo, employee images, guides, company events images 
* **Product Assets:** A product list overview where it is possible to use filter to help users to find the right product
* **Product Detail:** On the product detail page it is possible to download product assets for the chosen product
* **Download cart:** It is possible to collect multiple products to the download cart 
* **My orders:** Download product assets based on your orders in Customer center
* **Email:** A link will be send to one or more email addresses, where a zip file can be downloaded

A Dynamicweb license is needed, in order to use the download functionality
Remember to run update script from 1500, in order to receive newest ProductExportMail.cshtml from Dynamicweb, which is needed for receiving a mail with a download link. On existing solution delete the old ProductExportMail.cshtml which is not viewmodel base.

## Analyse and measure traffic with Google Analytics 4
* Google announced that Google Analytics 3 (Universal) will no longer be supported July 1st 2023. Google Analytics 4 (GA4) will take its place because of GDPR and Cookie issues in the current Google Analytics 3.
* Swift is releasing GA4, where the ecommerce events are supported. This will enable you to see e.g. **Monetisation on E-commerce purchases, Engagement events & conversions**
* GA4 gives you a more intelligent user privacy and tracking features, it gives users more intuitive and precise control over what personal data is collected, which is important to help your business comply with current and future privacy regulations.
* With GA4 you can analyse your ecommerce website, by measuring traffic and engagement across your websites. You will get simplified goals and events setup, which was a complex set up before regarding transactional functions such checkouts.
* Swift supports Debug view mode, enable the debug mode in website settings and you can debug real-time report that GA4 provides, track data immediately when testing on your website. (You need to be login in DW backend in order to use debug view mode for testing)

**General**
* Measurement ID is needed to use GA4, which is placed in website settings
* GA4 will be triggered when accepting All cookies or statistical cookies
* Here are the ecommerce events that are supported in Swift
https://doc.dynamicweb.com/swift/setup-project/guides/google-analytics-4

## Content marketing

### Content search
* Help visitors find what they are looking for on the website either products or content information. Content search can help visitors to quickly find new information about the company’s business e.g. through articles. 
* Swift has product search, but now content search is also available. Content search can be used together with the product search or by itself e.g. if you have a website that does not include ecommerce.

### Better Responsive behaviour
* Improve the visual presentation of your website on smaller devices.
* Define how your content elements should be placed: stacked, side by side. 
* Control spacing and padding and define which column what should be placed first.

## B2B solution

### Create & Manage users
* Easier way for Sales representative to create & manage customers. A sales rep. has the opportunity to create and manage users in Customer center
* This allows the Sales rep. to create new users in frontend, without logging in the backend administration. The sales rep. can get a list of customers that he/she has created and see an overview over who has accepted their invitation.
* This is a strong functionality that can be used together with impersonation, when a sales rep. can create an order on-behalf of their customers.

## GDPR, Compliance, Lighthouse score & Schema.org

### Google fonts
* Google hosted fonts can be violating the EU privacy regulation in some EU countries, i.e. Germany, therefore Google font is now downloaded and served from the solution.

### Alt text
* Add Alt text for images on content elements. Alt text is used for visitors that are unable to see the images on the website, but uses tool such as screen readers

### Heading level
* SEO requires there should always be a < h1 > on a content page. Define heading level on the content elements by settings h-tags e.g.  < h1 > < h2 >. As default we set < h2 >

### Schema.org
* Schema.org helps the search engine to better understand the info that is on the website, to have a more rich search result. Schema.org has been added for articles , employee and block quotes elements

## Improvements & Maintenance

### General
* **Clickable/non clickable menus:** support both for Content pages and Ecommerce groups
* **Deployment:** Improvements on the deployment set up, on how to deploy Swift on another solution. Read the guide here
https://doc.dynamicweb.com/swift/setup-project/guides/how-to-deploy-swift-to-another-solution#sideNavTitle1

### Design
* **Themes:** Button link is added and can be used on the content elements
* **Themes:** Accent colors is added. It is currently only supported for TextAdvanced content element (Support on the other content elements will come later)
* **Text and image:** possible to add 2 buttons

### Content
* **Related products:** Use Swiffy slider instead of tiny slider for related products slider
* **Product group slider:** On the front page or other regular content page possible to use Product group as a slider to have an easier way to access and promote product groups.
* **TextAdvanced:** New content element where you have advanced settings to control top/bottom, right/left padding, accent colors, font sizes for eyebrow, title and subtitle.

### Product detail
* Optimization on how Product page is rendered to make breadcrumb work optimal
* Possible to hide display group Title e.g. when using rich text for extra information

### Product components
* **Quote button component:** Possible to add directly to the quote cart from product detail page

### Checkout
* **Payment providers:** ChargeLogic, Cybersource and EbizCharge

### Email
* We no longer support the old Newsletter emails, instead use the improved Email concept.
* The new Email concept will also include designing System email on Visual editor, but this is still under development. 

# v1.13.1
## [1.13.1] - 25-08-2022

## Disclaimer
* This is a partly hotfix for javascript issues in v.1.13.0

## Bugfixes
* Express buy: Tax lines not in orderlines + added total sales tax to summary
* General: Repisitories are missing a secondary instance
* General: Missing Refere to AddToCart component to support Google Analytics 4
* General: Missing tracing on Variant modal to support Google Analytics 4
* General: Better check for tracking permission around Google Analytics 4, trigger when Statistical in cookies is set to true
* General: Fixes code errors that will not compile on .net
* General: fix wrong translation + add missing
* General: Error in console when hovering over megamenu, check if js-dropdown-toggle exist
* General: Required Bootstrap version 5.1.3 and not ^5.1.3 
* General: Missing States/Region field
* Itemtypes: Remove added space to search term
* Itemtypes: Content search design optimization
* Itemtypes: Remove dotted outline for mega menu items
* Itemtypes: Related products, changed getList to getRawValueString for better performance
* Itemtypes: Fix error in console when adding to favorites, as = " style " on styles likes
* Itemtypes: TextAdvance, fix spacing
* Itemtypes: Item repeater, Fix empty product link 
* Itemtypes: ProductDetailsMediatable, Wrong unit is file size Bytes to KB conversion
* Itemtypes: flex-nowrap on AddToCart and AddToQuote component
* Product Detail: Support DefaultVariant on product links

## Changed
* General: btn link refactor

## Added
* Checkout: Add payment provider templates EbizCharge, Cybersource and 
ChargeLogic
* Customer center: Possible to download products assets and product info based on an order
* Itemtypes: Content search, possible to search for content pages on the site
* Itemtypes: Possible to add padding on buttons in Branding
* General: GetAllProducts -> GetLastActiveProducts
* General: Download google fonts to local directory, due to GDPR law
* General: Tracking on related product list to support Google Analytics 4

## Removed
* Email: Undo email button links URL fix
* General: Remove use of helper in master related to live integration dialog
* General: Remove @translate tag around stock states inStock and OutOfStock
* General: Category images dissapears, Remove group ID from URL as it is already there on ProductListGridView

# v1.13.0
## [1.13.0] - 15-08-2022

## Added
* Customer Center: My orders, Reorder functionality
* General: Support Google Analytics 4, support eCommerce tracking (Google API key and Measurement ID is required). This is Part 1: It supports GA4 on product list: List, Grid and Compact view templates, Checkout and add to favorite. Part 2 will consist of supporting GA4 on the product components
* General: Button link is added in Themes
* Itemtype: TextAdvanced, an alternative to Text column, where you have more settings regarding padding, font sizes etc.
* Itemtype: Product group slider, possible to present a image slider based on the eCommerce group
* Itemtype: Improve variant option selector layout options
* Itemtype: Static variant component for product list
* Itemtype: Clickable menu item, support clickable settings from backend for Content pages and Ecommerce groups
* Itemtype: Text possible to add 2 buttons
* Product Assets: Multi selector for language and Image dropdown, send to multiple emails (DW licens is required for this functionality)
* Itemtype: Possible to download product assets on Product Detail page, using download data form component (DW license is required for this functionality)

## Changed
* General: Improve rendering on Product Detail Page
* General: Only show impersonation bar if can-impersonator og is-impersonating

## Bugfixes
* Checkout: Fixed different padding sizes for list group items
* Checkout: Disable the region field correctly when not in use, to avoid using wrong state in billing address and payment
* Customer center: Integration customer center, missing theme
* Customer center: integration customer center, better icon wrapping and text allignment
* Digital Assets: Error in panel if image is renamed or deleted
* Digital Assets: double details in panel, render only from first or default
* General: Support OnEnterKey for quantity fields on Product list and Product detail page
* General: Typeahead abort request while still making new request
* General: Render footer on iPad Safari
* General: On Expressbuy debouncer and abort, fix request when typing in the search field
* General: Schema.org values on Product Detail Page, support Short description, long description, SKU, Branding and stock
* Itemtype: Null check fix on Logo, when link field is empty
* Itemtype: Component Text is wrapped, Clean up prices + set .btn to inline-flex to properly align icons
* Itemtype: Better alignment for component buttons
* Itemtype: Removed margin bottom from  product group header for better alignement
* Itemtype: Group navigation - fix missing padding in group navigation node name
* Itemtype: Blockquote - make it clickable
* Itemtype: Rows, set correct url encoding for background images, failed when there was spacing in folder or file name
* Itemtype: Media gallery, default image fall, did not rendered image when images pattern was disabled
* Itemtype: Remove @, caused error on Compact product list 
* Itemtype: Pass no-theme to partial, Price information is not aligning on ProductDetailsInfo
* Itemtype: Better z-index implementation for add to quote and add to cart buttons
* Itemtype: Better "Add" button label/icon implementation, so it does not disappear when clicked
* Itemtype: Always render grid in Visual Editor, fix cannot edit row templates
* Itemtype: ProductDetailsGallery, better image rendering on mobile view
* Itemtype: Group navigation, added scrollbar, navigation arrows and fixed wrapping
* Itemtype: Use correct tag for service pageid for Product components AddToCart and AddToQuote, to avoid issues when adding a product variant

## Removed
* Newsletter email: Remove old newsletter files (The old newsletter will no longer be supported). Instead use the new Email concept


## [v1.12.0] - 23-06-2022

## Added
* Customer Center: RMA (Return merchandise Authorization) Possible to return your product. The RMA implementation is based on the old Customer Center app
* Digital Assets Portal: Possible to have an overview over downloadable assets, which is not product related such as: Logo, company and employee images. General documents about the company.
* Itemtype: On Row setting you can define how the responsive behaviour should be n mobile devices, stacked or side-by-side. It is also possible to choose which column should be presented first
* Itemtype: New Slider, which is an alternative to the old carousel. Using Swiffy slider
* Itemtype: Possible to hide Display group title ProductSpecification

## Changed
* Itemtype: Related product slider: implement Swiffy slider instead of TinySlider

## Bugfixed
* Checkout: Remove the word 'checked' in address label
* Checkout: Remove empty value attribute, when signing up for newsletter
* Customer center: Unify order receipt in Cart and My orders
* Digital Assets Portal: Adds the minimum quantity for the product on the download cart
* Email: Missing double quotes in Swift_EmailMaster.cshtml
* Express buy: Info text is not rendered, whe loading page for the first time
* General: Fix broken layout on Cart steps, receipt and CC order detail 
* General: Fix broken PIM queries, pointing to old repository Products instead of SwiftProducts
* General: Fix Google places street number issue
* General. Fix broken translation file
* General: Fix live integration stock level
* General: Fix typo in OrderDeatils, QuoteDetails and integration CC OrderDetails
* Integration Customer Center: Not possible to download PDF if specific shop is selected in Live integration
* Itemtype: Images are scaled wrong on mobile view for Related slider
* Itemtype: Hide on scroll setting affacts placement of edit row marking and icons
* Itemtype: Related product slider indicators invert colors is missing
* Itemtype: Styling fixes on quote and download button
* Itemtype: Component selector optimization, wrap the options in modal
* Itemtype: Related product slider, remove vertical scrollbar Swiffy slider overflow-y fix
* Itemtype: Repeater does not render grid
* Itemtype: Product component Quote quantity select is not rendered when enabled
* Itemtype: Removed force padding on the component repeater
* Itemtype: Image is squashed in component row, improve the default image width implementation
* Itemtype: Breadcrumb navigation error on Product Detail Pages, remove broken item id lookup
* Itemtype: Not possible to edit row templates in visual editor, null check
* Product list: Sort order changes from relevance to Name when clicking load more
* Product list: Improve how we handle group setting when a product is updated
* Product list: Improve no products found logic

## [v1.11.0] - 30-05-2022

## Bugfixes
* Checkout: Sort Summary to match cart flow and cart summary
* Checkout: Remove zero discount values
* General: Loadmore button implement as link, improve 
* General: Fix spinner on compact list view, when live product info is disabled in Live integration
* General: Refactoring hide headers on scroll - intersection observer
* General: Component repeater, set searchQuery variable
* General: Use theme light for modal
* General: Replace <p> tags with <div> tags, removed some margins and use flex for space
* General: Remove default dark theme from price itemtype
* General: Related product always get a product does not use the settings
* General. Set same level buttons for both option in Cookie
* Itemtype: Do not render row markup if columns are empty
* Itemtype: Button icon size now follow button label size
* Product list: Hide facets if no product found

## Changed
* General: Thumbnails images for Page/Row/Column presets are resixed and compressed

## Added
* General: Support tax info is tax is set
* Itemtype: Alt texts to varius item types
* Itemtype: Heading levels on content, be able to define H1, H2, H3 etc.
* Customer Center: Create and manage users

## [v1.10.0] - 05-05-2022

Dynamicweb proudly presents **Swift 1.10.0 (Q1-2022)** This introduce additional B2B functionalities to Swift, such as Quotes Other than that there has been a big focus on ways to decrease the implmentation time. The main headlines for this release are:

## B2B solution

In this release there is a focus on capabilities supporting especially requirements from B2B customers that are moving their sales to digital channels.

### Quotes & assisted selling

* A sales rep can easily find products through the webshop and gather an offering to a customer that is interested in collection of products using **quotes**. The customer can request quotes and can see a list of open quotes in the customer center and convert quotes to orders.

### Products
* Show a replacement product if a **product is discontinued** / temporarily or permanently unavailable. This will help the customer to easily find an alternative product to purchase and a potential sale is not lost.

* Show **selected product** group on your products list, this gives an overview over the product subgroups that can be visited and highlights different product groups and makes catalog navigation more explorative for larger catalogs.

### Checkout 
* During checkout **Google places Autocomplete** can be used, which suggests street addresses when typing , this helps the user to type in the proper address format and also gives a faster checkout flow and ensuring data quality.

## Decrease implementation time 

Based on feedback from partners and developers ,significant improvements have been made in 3 areas that almost always requires some kind of customization. The information in product lists, on the product detail pages and the content in emails being send, mostly needs some kind of modification to match customer requirements.
Usually this causes several code changes that drives cost and complexity.
By utilizing the visual content builder in new ways, a lot of these customizations can be avoided and minimized resulting in faster and cheaper implementations.


### Build emails with Visual Editor
* Swift presents a new email concept where you can build beautiful newsletter emails through visual editor and re-use content and product data in emails.
* The plan with the new Email concept is also to design **System emails** using the visual content builder. This allows the email editor to visually design the system emails such order email, create account emails etc. Before changes to emails has to be done by developers directly in the templates – with the new concept, content can be edited in the visual content builder. **Building system emails** will come later on

### Building blocks for product list and details 
* **Product component** it gives the flexibility to create own product list and product detail page, through Visual editor, which can decrease the implementation time since you can build own product list
* **Custom components** can be added easily and adopted in the visual content builder

### Digital Assets Portal
* Make your product assets and **product information visible and available for download.** This is to help business optimize their work process for distributing their product assets and product information
* User can browse and collect products needed in other systems and **download data in various formats** together with digital assets like photos, images, documents, and other files.
* Product data can be exported in different**formats like CSV, XML and JSON.** Images can be delivered in different formats and resolutions depending on what they need to be used for.
* (Digital Assets Portal functionality requires a Dynamicweb license)


## Improve content marketing

* **Block quotes content element**  use for direct quotations e.g. quotes that benefits a company or the products that the company are selling 
* **Employee content element** - display the employee list on your website. Their name, title and contact information and promote who are behind the company. 
CTA on poster, text & image
* Possible to add **2 CTA buttons** Set A primary button and secondary button. Guide your customers through the website using CTA.
* Use **CTA button on the header navigation**, use it to guide users to a specific page e.g. a demo site, campaign page. 
Micro templates
* The **Micro templates** for font selector and theme selector has been improved, giving a nicely design and a better overview over your selection

## Improvements & maintenance
	
### General 
* Deployment tool set up, possible to deploy a swift website to an existing site
* Possible to edit Favicon in website settings
* Frontend user start page - Possible to decide if specific customers should start on a specific page after login 

### Content
* Feature column element - possible to select size options for the icons
* Article header - Reuse the information in Page settings such as Image, title description
* Image column element - possible to set page link
* Possible to add Image on row
* Locator ids has been added to the template, so it is possible to set up auto-test for your solution

### Products
* Support live products info
* ERP down settings
* Open order detail in integration customer center
* Decide Start stop level on navigation facets 
* Mega menu - Possible to choose an aspect ratio on product group images in the mega menu navigation. To visually highlight your product groups

### Checkout
* Order comment field in checkout - Possible to submit a comment during checkout, allows the customer communicate regarding a specific order
* Support  Delivery date calendar in checkout in Firefox and Edge
* Hide shipping price $0.00 in order details/receipt
* In checkout decide if a customer can create new addresses or edit an address field for logged in users

## [v1.9.0] - 08-04-2022

## Bugfixes 
* General: Change 'Remember me' label to 'Keep me signed in' on the sign in screen
* General: Variant color not shown on product detail
* General: Remove discount orderlines in Express buy page
* General: Add missing build files flatpickr.min.css, swiffy-slider.min.css and tiny-slider.css
* Checkout: Voucher tag fix label color
* Checkout: Broken checkout flow
* Customer Center: Fix bad ID name on favorite list
* Itemtype: Selected groups fix theme and padding
* Itemtype: Facet group navigation fix padding
* Itemtype: Added isClickable check to offcanvas menu items (for 1. level)
* Product Detail: Added anchor tag and link to field type of link in product specification

## Changed
* Itemtype: Update all icon design on the itemtypes to have a more aligned and beautiful design
* Itemtype: Redesign font selector (micro templates)
* Itemtype: Redesign theme selector (micro templates)

## Added   
* Email: New email concept to create beautiful newsletters and system emails through Visual editor
* General: Google Autocomplete on Checkout and My addresses for better user experience
* Generel: Add cart cheatsheet to expose cart information regarding prices with without VAT and taxes. Can be used for testing
* General: Quotes, possible to request a quote and get an offering. Supported in cart and Customer center
* Product catalog: Product component, customize your product list and details page through product components through Visual editor

## [v1.8.0] - 30-03-2022

## Bugfixes 
* Checkout: Improve implementation and fallback, back to cart link
* Checkout: Do not check on countrycodes before rendering regions
* Customer Center: Null check for the item identifier regarding redirect
* General: Clean up the url for products from search
* General: Include custom header in MasterNoLayout 
* Itemtype: Improve the Product detail image thumbnails
* Itemtype: Fix broken facets modal and scroll after modal close

## Changed
* Itemtypes: Optimize micro templates for theming and fonts

## Added   
* General: Frontend user start page setup. Decide which page should be presented after sign in
* Itemtypes: Possible to set start and stoplevels on navigation at facets

## [v1.7.0] - 16-03-2022

## Bugfixes 
* Customer Center: Favorite images width issue 
* Email: Fixed internal/external links for emails 
* Itemtype: Poster fixed missing ratio when poster has no  image and alignment 
* Itemtype: Product detail media table. better fallback 
* Itemtype: Improve favorite icon position on slider 
* General: gtag script is not outputted correctly 
* General: Improve language check implementation 
* General: Always hide title property 
* General: Remember search parameters 
* General: Login screen typo fix 
* Product Catalog: Badge validation error fixes 
* Product list: Re-introduction of variant images on product list 
* Product Detail: Fixed PDP and PageNoLayout template error 
* Product Catalog: Improve theme implementation on product list 
* Product Catalog: use Ecommerce badge text 
* Product Catalog: Facets counter text is not readable in horizontal  
* Product Catalog: Product group list remove scroll bar 

## Changed   
* Itemtype: enabled block quote for article page 

## Added   
* Checkout: Possible to hide edit address and manage address link 
* Checkout: Hide/show comment field 
* Checkout: Possible to hide terms and condition 
* Customer Center: Track and trace number on Order detail 
* Customer Center: Read only Manage address templates 
* Dynamic article header column for article page 
* General: Locator ids 
* Integration Customer Center: OpenOrder details page 
* Itemtype: Possible to add CTA on header 
* Itemtype: Add new rows with 5 and 6 columns 
* Itemtype Possible to add 2 CTA on Poster and Text & Image 
* Itemtype: Feature column element - more icon size options 
* Itemtype: Simple employee - content element 
* Itemtype: Block quote - content element 
* Product Detail: discontinued products - Support show another replacement product 

## [v1.6.1] - 04-02-2022

## Bugfixes
* General: Missing version bump on Master
* Integration Customer Center: Show only date when time is 00:00 


## [v1.6.0] - 03-02-2022

## Bugfixes
* Customer Center: Theme pagination 
* Email: Use own email icons and not external
* Email: Email order receipt throws an error
* General: MasterNoLayout is missing theme on body classes
* General: selectedDetailPage null checks
* General: Favorite icon should follow the image theme, if set
* General: Preferences languages, broken on mobile
* General: Uncaught TypeError when adding addToFavorites button on product slider and Related products
* General: Use correct default value on Header from page property
* Itemtype: Article list overlaps slider on mobile
* Itemtype: Product Slider, text alignment
* Itemtype: Related product list use proper micro template for title size
* Itemtype: Product group poster min view height 
* Itemtype: Duplicated default image on ProductDetailsGallery and productDetailsImage
* Order receipt: Total price section on print receipt has wrong placement
* Product Detail: Product specification - product fields shows system name in instead of catagory name
* Product Detail: Product with variants can be added to cart when it is out of stock
* Product List: Render option name instead of option on ProductListGridView

## Changed
* Itemtype: Edit restriction, product list should not contain newsletter paragraphs
* Itemtype: Group image and promotion image - Remove height keep only width
* General: Updates theme and branding using rem instead of px
* General: Branding letter spacing + lineheight increment itemtype field change to HTML5
* General: Preferences languages, use hreflang instead of lang
* General: Hide information when there is free shipping 
* Product List: Use VariantName instead of VariantId from viewmodel

## Removed
* General: Removed custom mapped breakpoint + markup clean up
* General: Window scrollto bug from typeahead on popstate

## Added
* General: Re-introduce ecommerce product badges due to merging conflicts
* General: Support for more asset formats
* Itemtype: Selected Product group 
* Itemtype: Location map include styling/themes 
* Itemtype: Footer Navigation dropdown, option to only show first level
* Itemtype: Mega menu possible to choose group image aspect ratio
* Itemtype: Possible to add background image and gradient to row
* Itemtype Article carousel possible to hide scrollbar
* Order receipt: Add ERP order number, if exist

- Database: A new database is uploaded for Swift version 1.6.0

## [v1.5.0] - 13-01-2022

Dynamicweb proudly presents **Swift 1.5 (Q4-2021)**. This update introduces more fundamental B2B- features to Swift,  
such as a quick way to add products to cart and an integrated customer center able to show orders, invoices,  
and credit notes from an ERP system. The main headlines for this service release are:   

## B2B - Express buy & better product overview 
* Search for SKUs and add products to cart quickly using the **express buy page**
* See orders, invoices, and credit notes from an ERP system with through **integrated Customer Center** 
* Two new **product list designs** – compact & list – make it easy to set up B2B-friendly product lists with more products & more technical details per page. 
* Support for adding **order references** during checkout, for solutions where references to an external system, like a procurement system, is a requirement. 
* You can now block out certain dates – single days, recurring weekdays & date ranges – from being selected via the **delivery date selector** 

## Enriched Product list & Detail 
* Support for adding sections with **downloadable files/documents** to product detail pages – e.g., datasheets, manuals, and other assets 
* Create **differentiated product detail designs** for product groups to highlight different types of products in the best way possible 
* Product lists now support showing **product group images and descriptions** – this makes it easier for the customer to distinguish between product groups at a glance 
* The **mega menu** and **off-canvas menu** now supports **product group images** and **promotional images** – this can help the customer locate the category they want to find and highlight sales or special events. Implemented both for desktop and mobile.  
* Present your products in a different perspective by showing an **alternative image** when hovering over a product in a product list 
* Native support for implementing **favorite lists** – studies show, that customers are more likely to return to a shop if they can save products for later 
* Highlight discounted, new, or campaign-products with **product badges** – this helps attract and retain customers and has been proven to increase conversion rates  

## Improves support for content marketing 
* Create beautiful content marketing **articles** – for instance blog posts, news items, press releases – with full creative freedom using the same content elements (rows, columns & presets) used to create other content on Swift. 
* Use **Animation On Scroll** to add small content animation on a site when scrolling. This creates a more dynamic feeling to the site and draws user attention to specific areas. 
* A new row with **6 columns** can be used when creating content, for instance to highlight and promote brand logos from associated businesses 

## General improvements and Maintenance 
* You can now add a **name** and **keywords** to images and other assets in PIM – this leads to better search engine results for e.g. Google image search 
* The content element **Poster** now supports adding an aspect ratio on the images, making it easier to control different poster heights 
* The content element **Text** now supports center vertical alignment 
* In the navigation you can now choose between **automated menu**, **mega menu**, and **dropdown**. And automated menu changes according to the navigation content. 
* Beautifications to the **Log in** screen to ensure an up-to-date experience 
* **Extra padding** can now be added to rows 
* JS modules now load dynamically for better performance 

## [v1.4.0] - 03-12-2021

## Bugfixes
* Checkout: The theme on Checkout receipt should follow column theme
* Checkout: Padding correction in Payment and delivery section
* Customer Center: Toast image is not rendered when only having 1 favorite list
* Customer Center: Favorite list do not use form submit
* Customer Center: Errors when deleting a favorite page, leaving an empty page
* Facets : Navigation, Sorting disappears when there is no facets
* General: Fix Translation
* Itemtype: Fix bad navigation preferences implementation + remove area label from dynamic modal on navigation and favorites
* Itemtype: Alignment fix on product slider
* Itemtype: Title field is missing
* Itemtype: Image and text is not centred and missing padding
* Itemtype: Align preferences node with navigation
* Itemtype: Facets collapse
* Product Detail: Improve the variant disable method when a product is out of stock
* Product Detail: Field title and content us wrapped in product details info column

## Changed 
* General: Adjusting Swift theme with Bootstrap variables

## Removed
* General: Remove border from favorite icon

## Added
* Checkout: Possible to disable dates on the delivery date calendar
* Customer center: Possible to add product variants to favorite list
* General: Express buy
* Itemtype: Row with 6 columns
* Itemtype: Possible to select Center Vertical alignment on Text Column
* Itemtype: Product slider, added related products and newest products
* Itemtype: Mega menu/Dropdown options
* Product Detail: Possible to create different product detail page design based on product group
* Product Detail: Quantity prices 

## [v1.3.0] - 16-11-2021

## Bugfixes
* Itemtype: Stop video play, when modal is closed
* Itemtype: Fix geolocation format on LocationMaps
* Product Details: Downloadable documents if file doesn't exist returns an error
* Product Details: HTML validation error 

## Changed
* Customer Center: State/Region dropdown on Add Addresse, Manage Addresses and Edit profile
* General: Unify themes for Product list and Product details
* General: Use Offcanvas instead of dropdown when adding to favorite list
* Itemtype: Improvements on Mega menu and dropdown

## Removed
* Itemtype: Remove hide navbar functionality on Product slider

## Added
* Itemtype: Simple map
* Checkout: Order reference field
* Customer Center: Integration Customer Center - orders, invoices, credit notes
* General: Add missing use of micro templates for 4 col flex row
* General: Update product query for Wheel size


## [v1.2.0] - 05-11-2021

### Bugfixes
* General: impersonation-reset-button-bug
* Checkout: Fixed missing company info in account information
* Checkout: Checkout receipt back btn link fix
* Checkout: Cleanup fixing alignment and scrollbar issue
* Customer Center: Fixing styling issues
* General: Forms for editors fix file upload
* Itemtype: Animation on scroll (AOS) fix
* Product Detail: Various bugs highlighted by Lighthouse related to the Product Details
* Product Detail: Fix when to hide/disable "add to cart"

### Changed
* General: Isolate js modules

### Added
* Checkout: Possible to Disable delivery date field
* Customer Center: Favorite list (Part 1) Possible to add master products to favorites
* Itemtype: Animation on scroll (AOS)
* Itemtype: Preset images
* Itemtype: Support attached documents on Product Detail through Assets Categories
* Product Detail: Price range low to high


## [v1.1.0] - 26-10-2021

Dynamicweb proudly presents Swift 1.1.0 This update brings more basic B2B features to Swift and introduces support for multi-language websites and shops. 
The main headlines for this service release are: 

### Attracts visitors 
* Support for multiple ecommerce languages and currencies makes it much easier to attract international customers, which helps you expand your market share and increase sales 
* Product List: Products with variants overwrite theme
* Support for voucher codes makes it possible to engage your customers elsewhere and bring them to your webshop 
* A find dealer map can help customers navigate to and find additional information about stores 

### Better cart and order handling 
* Sales representatives can now impersonate customers and e.g. create carts and place orders – this can help customers find the right products in specialized setups 
* Support for minimum quantity and step size when adding to cart and increasing order amounts can help customers get rid of inventory quickly  
* You can now set a product to 'Never out of stock', which means that the normal rules for stock don’t apply and it can always be added to cart regardless of the current stock level 
* Support for customers choosing a desired delivery date during checkout if they don’t want their order delivered ASAP 

### Improved Product Details page 
* Highlight your product and its spectacular features through embedded videos on the product details page 
* On solutions where no VAT is standard, we now also show the price including VAT on the product details page 
* Let the customer know when a product is back in stock through 'Expected delivery info’. 
* Showcase variant products as a variant list on the product details page and use filters and sorting to quickly find the variant you are looking for 

### Security 
* The account creation flow now uses two-step verification through email  
* An anonymous user setting makes it possible to hide price information and block new purchases

### General Improvements and Maintenance 
* Updated bootstrap to 5.1.3 
* Typeahead highlight, include product number in product suggestions 
* Possible to disable max-width 
* Named newsletter item types with newsletter 
* Text and Image should not stretch when original is selected 
* Fix Bad value true for attribute preload on element video 
* Accordion - Background color fill column 
* Video Element div not allowed as child of element button  
* Fix alignment on print 
* Fix translation on cart 
* Fixed cookie banner z-index bug 
* Order email missing strike through on unit price 
* Put search term in field, when arrow click 
* Facet alignment improvement
* Use correct country code tag in checkout
* Micro templates for Themes and fonts
* Custom cookies example


## [v1.0.3] - 05-10-2021

### Bugfixes
* Product List: Remove unused CSS from article
* Product List: Products with variants overwrite theme
* Itemtype: Use querystring data instead of form data on Product Slider
* Itemtype: Hide page-header in Visual Editor, when page behind option is set

### Changed
* General: Make header work in adaptive on tablets with wrong UA and make header detection more ressilient
* General: Remove flex, overflow, min-width from general templates

### Added
* Itemtype: Stretched link option settings

## [v1.0.2] - 24-09-2021

### Bugfixes
* Customer Center Order Details: Total discount in receipt 
* Itemtype: Carousel, Poster, VideoPoster grid unify
* Itemtype: Vertical align text
* Newsletter: Gmail theme fix
* Product List Page: Improve product images
* Product List Page: Use "Get" instead of "Post"

### Added
* Product Detail Page: Show error message on a PDP with no product

## [v1.0.1] - 23-09-2021

### Bugfixes
* Checkout: Aligned checkout summary item
* Cookies: Cookie notice responsive fixes and button style bug
* General: Translations
* Itemtype: Updated Feature field descriptions
* Itemtype: Remove unused fields from page item types
* Itemtype: Video player (field descriptions)
* Newsletter: Use the new page properties theme, instead of page theme
* Newsletter: Fixed product images alt text
* Order Email: Clean up order email + fix missing product image
* Product Detail Page: Fixed scroll position is not remembered after selecting a variant

### Added
* Itemtype: Video player (support for provided thumbnail)

## [v1.0.0] - 31-08-2021

This is our first release of Dynamicweb Swift. It's fast and easy to build ecommerce sites for both B2C and B2B with personalized prices, self service, customer center, fantastic search and a lot more. All this using only configuration and no coding.

Some benefits using Dynamicweb Swift

**Content authoring**

- Build beautiful designed pages using visual drag and drop
- Create landing pages with call to actions without coding – add lead generating forms and re-use product catalog to convert visitors into customers
- Content elements like video and carousels

**Attract visitors**

- Built in SEO using content and product data, automatic sitemap.xml, optimized mobile rendering and great performance
- Automatic micro data for improved product search result in Google
- SoMe tagging for increased product click conversions on social media

**Increase conversions**

- Proven and super optimized shopping and checkout flows removing obstacles
- Built for mobile and touch ensuring painless mobile experience all over
- Intelligent type ahead search with spell check, keyword and product suggestions ensuring users can find what they are looking for
- Find the right products using configurable filtering options ensuring customers find the product they are looking for
- Super performance with a near 100 lighthouse score ensuring users do not churn

Download database and images from here: https://doc.dynamicweb.com/swift/download
