<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0"  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="xml" omit-xml-declaration="yes" indent="yes"  encoding="utf-8" />
	
	<!-- Loading the file translations.xml for use in the translate template-->
	<xsl:variable name="translationfile" select="document('http://demo.core.dynamicweb.dk/Files/Templates/UserManagement/Translations.xml')/translations" />
	<xsl:variable name="currentlanguage" select="/Template/GlobalTags/Global.Area.LongLang" />

	<xsl:template match="/">
		<xsl:call-template name="debug" />
		<xsl:apply-templates />
	</xsl:template>
	
	<xsl:template match="Template">
		<h2>
			<xsl:call-template name="translate">
				<xsl:with-param name="translationkey" select="'usermanagementheader'" />
				<xsl:with-param name="defaulttranslation" select="'User Management'" />
			</xsl:call-template>
		</h2>
		<h3>
			<xsl:call-template name="translate">
				<xsl:with-param name="translationkey" select="'listgroupheader'" />
				<xsl:with-param name="defaulttranslation" select="'Groups'" />
			</xsl:call-template>
		</h3>
		<xsl:apply-templates select="loop[@name='Groups']" />
		<h3>
			<xsl:call-template name="translate">
				<xsl:with-param name="translationkey" select="'listuserheader'" />
				<xsl:with-param name="defaulttranslation" select="'Users'" />
			</xsl:call-template>
		</h3>
		<xsl:apply-templates select="loop[@name='Users']" />
		<xsl:if test="Users.DwPaging.PageCount &gt; 1">
			<xsl:apply-templates select="loop[@name='Users.DwPaging.LoopPageGroup']" />
		</xsl:if>
	</xsl:template>
	
	<xsl:template match="loop[item]">
		<ul>
			<xsl:apply-templates select="item" />
		</ul>
	</xsl:template>
	
	<xsl:template match="item[UserManagement.Group.Name]">
		<li>
			<a href="{UserManagement.Group.DetailUrl}">
				<xsl:value-of select="UserManagement.Group.Name" />
			</a>
			<xsl:apply-templates select="loop[@name='Groups']" />
		</li>
	</xsl:template>
	
	<xsl:template match="item[UserManagement.User.Name]">
		<li>
			<a href="{UserManagement.User.DetailUrl}">
				<xsl:value-of select="UserManagement.User.Name" />
			</a>
		</li>
	</xsl:template>
	
	<xsl:template match="loop[@name='Users.DwPaging.LoopPageGroup']">
		<div class="paging">
			<p>
				<xsl:value-of select="concat('Now showing page ', ../Users.DwPaging.CurrentPage, ' of ', ../Users.DwPaging.PageCount)" />
			</p>
			<xsl:if test="../Users.DwPaging.PreviousButtonText">
				<a class="previouslink" href="{../Users.DwPaging.FirstPageLink}">
					<xsl:text>First page</xsl:text>
				</a>
				<a class="previouslink" href="{../Users.DwPaging.PreviousPageLink}">
				    <xsl:value-of select="../Users.DwPaging.PreviousButtonText" />
				</a>
			</xsl:if>
			<ul>
				<xsl:apply-templates select="item" mode="paging" />
			</ul>
			<xsl:if test="../Users.DwPaging.NextButtonText">
				<a class="previouslink" href="{../Users.DwPaging.NextPageLink}">
				    <xsl:value-of select="../Users.DwPaging.NextButtonText" />
				</a>
				<a class="previouslink" href="{../Users.DwPaging.LastPageLink}">
					<xsl:text>Last page</xsl:text>
				</a>
			</xsl:if>
		</div>
	</xsl:template>
	
	<xsl:template match="item" mode="paging">
		<li>
			<xsl:if test="../../Users.DwPaging.CurrentPage = PageGroup.PageNumber">
				<xsl:attribute name="class">
					<xsl:text>activepage_True</xsl:text>
				</xsl:attribute>
			</xsl:if>
			<a href="{PageGroup.PageLink}">
				<xsl:value-of select="PageGroup.PageNumber" />
			</a>
		</li>
	</xsl:template>

	<xsl:template name="translate">
		<xsl:param name="translationkey" />
		<xsl:param name="defaulttranslation" />
		<xsl:choose>
			<xsl:when test="$translationfile/translations/key[@name=$translationkey]">
				<xsl:value-of select="$translationfile/key[@name=$translationkey]/translation[@culture=$currentlanguage]" />
			</xsl:when>
			<xsl:otherwise>
				<xsl:value-of select="$defaulttranslation" />
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	
	<xsl:template name="debug">
		<xsl:if test="/Template/Server.Request.debugxml = 'true'">
			<textarea>
				<xsl:copy-of select="/" />
			</textarea>
		</xsl:if>
	</xsl:template>

</xsl:stylesheet>