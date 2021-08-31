
# Introduction  

Dynamicweb Swift is a **plug-and-play standard solution** which allows you to create beautiful mobile-friendly ecommerce websites with almost no coding.  

It is installed on top of a [Dynamicweb application](https://doc.dynamicweb.com/get-started/introduction).

This repository contains:

1. A folder with design files, images, and other static resources

# Installation

The basic install procedure is:

1. Prepare the hosting environment
2. Install the Dynamicweb application
3. Set up a website in IIS Manager and add the Swift-folder as a virtual directory
4. Download the Product image folder Swift_20211507_Products.zip
	- 'Products image folder' insert the folder here Swift/Files/Files/Images/Products
5. Build the Swift design
6. Install the Swift database & connect solution to it
7. Log in and install a license

## Requirements

1. Swift ´1.0 requires Dynamicweb version 9.10.14 or newer

 The baseline database is a bacpac file created using the MS SQL Server 2016 standard (version SQL server 15.0.2080.9) using SQL Server Management Studio 2019 version 15.018040.0.

## Hosting environment & Dynamicweb install

Swift must be installed on a server or local machine running Windows & a recent Dynamicweb application.

* [Software/Hardware requirements for Dynamicweb 9](https://doc.dynamicweb.com/get-started/introduction/requirements/requirements-dw9#2171)
* [Preparing the hosting environment](https://doc.dynamicweb.com/get-started/introduction/installation/hosting-environment "Preparing the hosting environment")
* [Install Dynamicweb](https://doc.dynamicweb.com/get-started/introduction/installation/installing-dynamicweb "Install Dynamicweb")
* [Download Swift database](https://doc.dynamicweb.com/Files/Files/Releases/Swift/Swift-1.0/Swift_All/Swift_20210831_Database.zip "Download Swift database")
* [Download Swift Product Image folder](https://doc.dynamicweb.com/Files/Files/Releases/Swift/Swift-1.0/Swift_All/Swift_20210831_DemoProductImages.zip "Download Swift Product Image folder")

After following these guides you will have a freshly installed Dynamicweb solution, which is ready to run Swift.


## Add Swift-folder as virtual directory

To use the Swift-design you must add the Files-folder from this repositoryas a virtual folder for the website you created in IIS Manager:

1. Open IIS Manager and locate the website
2. Right-click the website and click Add virtual directory
3. Write *Files* in the Alias-field
4. Enter the physical path to the Swift /files-folder
5. Click OK

This sets the downloaded /Files-folder as a virtual directory for the website, which means that you can easily upgrade the Dynamicweb application at a later date without having to physically move the Files-folder every time.

## Install Node.js and build design

Swift uses webpack to calculate dependencies and bundle scripts, images and other assets. This means that the design must be built after being cloned:

1. Download and install Node.js
2. Open a command prompt and navigate to folder Swift is cloned to
3. Run *npm install*
4. Run *npm run build:webpack*
5. Run *npm run start*

## Restore database and connect with solution

This repository contains a number of **database files** - .bak or .bacpac - with demo data, e.g. pages, products, demo users, etc.  You often want to use these as a starting point for a new Swift project.

To restore the database:

* Open SQL Management studio and connect to your server
* Right-click the server and open Properties > Security – verify that Server Authentication is set to SQL Server and Windows authentication mode
* Right-click the Databases-node and select Import Data-tier Application
* Select Import from local disk and select the .bacpac file – click next
* Enter a name and click next

The connection between a solution and a database is stored inside a files called *GlobalSettings*. This file is part of the repo, so it will be overwritten every time you retrieve the latest version of Swift from here.

To solve this issue consider creating a *GlobalSettings.database.config* file inside the /Files folder with the connection details:

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

Whenever the solution is accessed this file will be used in place of the database node in globalsettings – and it will not be overwritten.

## Log in and install a license

After successfully connecting the database and solution you can go to ***yoururl.com/admin*** and log in with the administrator username and password.

After logging in you will be asked to [Install a license](https://doc.dynamicweb.com/get-started/introduction/installation/installing-a-license "Install a license").  

If you instead see the Dynamicweb Installer the database and solution are not correctly linked. Try recycling the application pool and trying again.
