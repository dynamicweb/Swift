<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0"  xmlns:xsl="http://www.w3.org/1999/XSL/Transform" >
  <xsl:output method="html" omit-xml-declaration="yes" indent="yes"  encoding="utf-8" />
  <xsl:param name="html-content-type" />
  <xsl:template match="/Template">
	<style type="text/css">
	  .LBimg
	  {
	  float: left;
	  padding: 5px;
	  margin:2px;
	  text-align: center;
	  vertical-align: middle;
	  border: solid 1px #c1c1c1;
	  }
	  .LBimg a
	  {
	  text-align: center;
	  vertical-align: middle;
	  display: block;
	  height: 100%;
	  }
	</style>
	<xsl:for-each select="loop[@name='Images']/item">
	  <div class="LBimg">
		<a>
		  <xsl:attribute name="href">
			<xsl:value-of select="Gallery.Image.DetailLink" disable-output-escaping="yes"/>
		  </xsl:attribute>

		  <xsl:attribute name="title">
			<xsl:value-of select="Gallery.Image.Name" disable-output-escaping="yes"/>
		  </xsl:attribute>

		  <xsl:value-of select="Gallery.Image.Thumb.Medium" disable-output-escaping="yes"/>
		</a>
	  </div>
	</xsl:for-each>
	<xsl:value-of select="Gallery.List.NoImagesText" disable-output-escaping="yes"/>
  </xsl:template>
</xsl:stylesheet>