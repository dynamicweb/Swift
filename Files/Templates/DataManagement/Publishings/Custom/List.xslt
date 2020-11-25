<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0"  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="xml" omit-xml-declaration="yes" indent="yes"  encoding="utf-8" />
	
	<xsl:template match="/">
		<xsl:apply-templates select="Template" />
	</xsl:template>
	
	<xsl:template match="Template">
		<xsl:apply-templates select="loop[@name='Rows']" />
		<xsl:if test="DwPaging.PageCount &gt; 1">
			<xsl:apply-templates select="loop[@name='DwPaging.LoopPageGroup']" />
		</xsl:if>
	</xsl:template>
	
	<xsl:template match="loop[@name='Rows']">
		<table border="1" cellpadding="2" cellspacing="2">
			<tr>
				<xsl:apply-templates select="../loop[@name='Columns']/item" mode="header" />
			</tr>
			<xsl:apply-templates select="item" mode="row" />
		</table>
	</xsl:template>
	
	<xsl:template match="item" mode="header">
		<td>
			<xsl:value-of select="Column.Name" />
		</td>
	</xsl:template>
	
	<xsl:template match="item" mode="row">
		<tr>
			<xsl:apply-templates select="loop[@name='Row']" />
		</tr>
	</xsl:template>
	
	<xsl:template match="loop[@name='Row']">
		<xsl:apply-templates select="item" mode="item" />
	</xsl:template>
	
	<xsl:template match="item" mode="item">
		<td>
			<xsl:choose>
				<xsl:when test="Row.DetailUrl">
					<a href="{Row.DetailUrl}">
						<xsl:apply-templates select="Row.Value" />
					</a>
				</xsl:when>
				<xsl:otherwise>
					<xsl:apply-templates select="Row.Value" />
				</xsl:otherwise>
			</xsl:choose>
		</td>
	</xsl:template>
	
	<xsl:template match="Row.Value">
		<xsl:value-of select="." />
	</xsl:template>
	
	<xsl:template match="loop[@name='DwPaging.LoopPageGroup']">
		<div class="paging">
			<p>
				<xsl:value-of select="concat('Now showing page ', ../DwPaging.CurrentPage, ' of ', ../DwPaging.PageCount)" />
			</p>
			<xsl:if test="../DwPaging.PreviousButtonText">
				<a class="previouslink" href="{../DwPaging.FirstPageLink}">
					<xsl:text>First page</xsl:text>
				</a>
				<a class="previouslink" href="{../DwPaging.PreviousPageLink}">
				    <xsl:value-of select="../DwPaging.PreviousButtonText" />
				</a>
			</xsl:if>
			<ul>
				<xsl:apply-templates select="item" mode="paging" />
			</ul>
			<xsl:if test="../DwPaging.NextButtonText">
				<a class="previouslink" href="{../DwPaging.NextPageLink}">
				    <xsl:value-of select="../DwPaging.NextButtonText" />
				</a>
				<a class="previouslink" href="{../DwPaging.LastPageLink}">
					<xsl:text>Last page</xsl:text>
				</a>
			</xsl:if>
		</div>
	</xsl:template>
	
	<xsl:template match="item" mode="paging">
		<li>
			<xsl:if test="../../DwPaging.CurrentPage = PageGroup.PageNumber">
				<xsl:attribute name="class">
					<xsl:text>activepage_True</xsl:text>
				</xsl:attribute>
			</xsl:if>
			<a href="{PageGroup.PageLink}">
				<xsl:value-of select="PageGroup.PageNumber" />
			</a>
		</li>
	</xsl:template>
</xsl:stylesheet>