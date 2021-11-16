# Changelog

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
