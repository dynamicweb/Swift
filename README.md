
# Swift by DynamicWeb

Swift allows you to create beautiful mobile-friendly websites. Swift gives  It is **fast and easy to build ecommerce sites** on Dynamicweb for both **B2C** and **B2B**. Using configuration and almost no coding. 

![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/dynamicweb/Swift?color=orange&label=Swift%20Release) [![GitHub DW](https://img.shields.io/badge/DynamicWeb9%20Release-v9.17.10-blue)](https://doc.dynamicweb.com/downloads/releases) [![GitHub DW10](https://img.shields.io/badge/DynamicWeb10%20Release-v10.7.0-darkblue)](https://doc.dynamicweb.dev/) [![GitHub Bootstrap](https://img.shields.io/badge/Bootstrap-v5.1.3-green)](https://getbootstrap.com/) [![GitHub DW](https://img.shields.io/badge/Swift-documentation-purple)](https://doc.dynamicweb.com/swift/setup-project) 

[Key features](#key-features) • [Installation](#installation) • [Requirements](#requirements) • [Hosting & Install DW](#hosting-environment-and-dynamicweb-install) • [Database](#swift-database-and-product-images) • [License](#log-in-and-install-a-license)

![alt text](https://doc.dynamicweb.com/Files/Images/Swift/swift-multidevices.png)

## Key features 

* **Mobile first** :iphone:, responsive, scaleable and content resilient rendering. Ensuring painless mobile experience.
* **Lighthouse 95+ points** :100: performance optimized implementation, ensuring users do not churn
* **SEO** :pencil:  is build in using content and product data
*  **Build designed pages** :art: using visual drag and drop to create your content
* **Web Accessibility Guidelines (WCAG)** :trophy: Level AA compliance, make web content more accessible
* **World Wide Web (W3C)** :globe_with_meridians: validated following website formatting standards
* **Visual editor** :rainbow: building content pages, product list and product detail pages in a visual manner and with components 

![alt text](http://doc.dynamicweb.com//Files/Images/Swift/VE-clothes.gif)

# Installation

Swift is installed on top of a [Dynamicweb application](https://doc.dynamicweb.com/get-started/introduction).
This repository contains a `./Files` with design files, images, and other static resources

**The basic install procedure is:**

1. Prepare the hosting environment
2. Install the DynamicWeb application
3. Set up a website in IIS Manager and add the Swift-folder as a virtual directory
4. Download the [Swift Product Image folder](https://doc.dynamicweb.com/Files/Files/Releases/Swift/Swift-v1.26.0/Swift_20240305_DemoProductImages.zip "Download Swift Product Image folder") and insert the folder here `Swift/Files/Files/Images/Products`
5. Build the Swift design
6. Install the Swift database & connect solution to it
7. Log in and install a license

## Requirements
* **Swift v1.26.8** requires **DynamicWeb version 9.18.2** and **Shipmondo dll v2.0.0** or newer, it can also run on **DynamicWeb v10.9.0** or newer, if Shipmondo is used, it requires **Shipmondo.dll version 10.0.5 (which needs to be installed) or newer**

* **Swift v1.26.7** requires **DynamicWeb version 9.17.10** and **Shipmondo dll v2.0.0** or newer, it can also run on **DynamicWeb v10.7.0** or newer, if Shipmondo is used, it requires **Shipmondo.dll version 10.0.5 (which needs to be installed) or newer**

* **Swift v1.26.6** requires **DynamicWeb version 9.17.10** and **Shipmondo dll v2.0.0** or newer, it can also run on **DynamicWeb v10.7.0** or newer, if Shipmondo is used, it requires **Shipmondo.dll version 10.0.5 (which needs to be installed) or newer**

* **Swift v1.26.5** requires **DynamicWeb version 9.17.10** and **Shipmondo dll v2.0.0** or newer, it can also run on **DynamicWeb v10.7.0** or newer, if Shipmondo is used, it requires **Shipmondo.dll version 10.0.5 (which needs to be installed) or newer**

* **Swift v1.26.4** requires **DynamicWeb version 9.17.4** and **Shipmondo dll v2.0.0** or newer, it can also run on **DynamicWeb v10.4.0** or newer, if Shipmondo is used, it requires **Shipmondo.dll version 10.0.5 (which needs to be installed) or newer**

* **Swift 1.26.3** requires **DynamicWeb version 9.17.4** and **Shipmondo dll v2.0.0** or newer, it can also run on **DynamicWeb version 10.4.0** or newer, if Shipmondo is used, it requires **Shipmondo.dll version 10.0.5 (which needs to be installed) or newer**

* **Swift 1.26.2** requires **DynamicWeb version 9.17.1** and **Shipmondo dll v2.0.0** or newer, it can also run on **DynamicWeb version 10.1.0** or newer, if Shipmondo is used, it requires **Shipmondo.dll version 10.0.5 (which needs to be installed) or newer**


See requirements for older Swift versions [here](https://doc.dynamicweb.com/downloads/swift#sideNavTitle1-1)

* The baseline database is a bacpac file created using the Microsoft SQL Server 2016 standard (version SQL server 15.0.2080.9) using SQL Server Management Studio 2019 version 15.018040.0.


## Hosting environment and DynamicWeb install

Swift must be installed on a server or local machine running Windows and a recent DynamicWeb application.


| Links |      |
| ------ | ------ |
| DW9 | [Software/Hardware requirements ](https://doc.dynamicweb.com/get-started/introduction/requirements/requirements-dw9#2171) |
| Hosting | [Preparing the hosting environment](https://doc.dynamicweb.com/get-started/introduction/installation/hosting-environment "Preparing the hosting environment")|
| Install | [Dynamicweb](https://doc.dynamicweb.com/get-started/introduction/installation/installing-dynamicweb "Install Dynamicweb") |

After following these guides you will have a freshly installed DynamicWeb solution, which is ready to run Swift.

## Swift database and product images


| Download |      |
| ------ | ------ |
| Database | [Swift Demo database](https://doc.dynamicweb.com/downloads/swift#sideNavTitle1-3 "Download Swift database")|
| Database | [Swift Empty database](https://doc.dynamicweb.com/downloads/swift#sideNavTitle1-4 "Download Swift Empty database, with No Ecom data")|
| Image folder | [Swift Product Image](https://doc.dynamicweb.com/Files/Files/Releases/Swift/Swift-v1.26.0/Swift_20240305_DemoProductImages.zip "Download Swift Product Image folder") |


## Add Swift-folder as virtual directory

To use the Swift-design you must add the Files-folder from this repository as a virtual folder for the website you created in IIS Manager:

1. Open IIS Manager and locate the website
2. Right-click the website and click *Add virtual directory*
3. Write `Files` in the Alias-field
4. Enter the physical path to the Swift `./Files` folder
5. Click OK

This sets the downloaded `./Files` folder as a virtual directory for the website, which means that you can easily upgrade the DynamicWeb application without having to move the `.\Files` folder every time.

## Install Node.js and build design

Swift uses webpack to calculate dependencies and bundle scripts, images and other assets. This means that the design must be built after being cloned:

1. Download and install [Node.js](https://nodejs.org/en/)
2. Open a command prompt and navigate to folder Swift is cloned to
3. Run `npm install`
4. Run `npm run build:webpack`
5. Run `npm run start`

## Restore database and connect with solution

This repository contains a number of **database files**  `.bak` or `.bacpac` - with demo data, e.g. pages, products, demo users, etc.  You often want to use these as a starting point for a new Swift project.

To restore the database:

* Open SQL Management studio and connect to your server
* Right-click the server and open **Properties > Security** – verify that Server Authentication is set to SQL Server and Windows authentication mode
* Right-click the Databases-node and select **Import Data-tier Application**
* Select Import from local disk and select the `.bacpac` file – click next
* Enter a name and click next

The connection between a solution and a database is stored inside a files called *GlobalSettings*. This file is part of the repo, so it will be overwritten every time you retrieve the latest version of Swift from here.

To solve this issue consider creating a `GlobalSettings.database.config` file inside the `./Files` folder with the connection details:

```xml
<?xml version="1.0"?>
<Globalsettings>
<System>
    <Database>
      <Password>yourpassword</Password>
      <Type>ms_sqlserver</Type>
      <UserName>yourSQLusername</UserName>
      <Database>yourdatabasename</Database>
      <SQLServer>localhost</SQLServer>
      <DWWebIP>
      </DWWebIP>
      <SQLServer2>
      </SQLServer2>
      <Database2>
      </Database2>
      <UserName2>
      </UserName2>
      <Password2>
      </Password2>
      <IntegratedSecurity>False</IntegratedSecurity>
      <ConnectionString>
      </ConnectionString>
      <ConnectionString2>
      </ConnectionString2>
    </Database>
</System>
</Globalsettings>
```

Whenever the solution is accessed this file will be used in place of the database node in `globalsettings-config` – and it will not be overwritten.

## Log in and install a license

* After successfully connecting the database and solution you can go to ***yoururl.com/admin*** and log in with the administrator username and password.

* After logging in you will be asked to [Install a license](https://doc.dynamicweb.com/get-started/introduction/installation/installing-a-license "Install a license").  

* If you instead see the DynamicWeb Installer the database and solution are not correctly linked. Try recycling the application pool and trying again.
