# Changelog

## [v1.10.0] - 05-05-2022

## Bugfixes 

## Changed

## Added

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
