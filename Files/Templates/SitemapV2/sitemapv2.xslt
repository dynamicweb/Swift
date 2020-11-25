<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"  xmlns:xsl="http://www.w3.org/1999/XSL/Transform" >

  <!--
  Description: ul/li based navigation. No features from admin implemented.
  Recommended settings:
  Fold out: True or False
  Upper menu: Dynamic or Static
  First level: > 0
  Last level: >= First level
  -->
  <xsl:output method="xml" omit-xml-declaration="yes" indent="yes"  encoding="utf-8" />
  <xsl:param name="html-content-type" />
  <xsl:template match="/NavigationTree">

    <style type="text/css">
      #sitemap.M0 li a {
        font-family:<xsl:value-of select="//Setting[@Level=1]/NavigationFont/@Value" disable-output-escaping="yes"/>;
        font-size:<xsl:value-of select="//Setting[@Level=1]/NavigationFontSize/@Value" disable-output-escaping="yes"/>;
        color:<xsl:value-of select="//Setting[@Level=1]/NavigationFontColor/@Value" disable-output-escaping="yes"/>;
        font-weight:<xsl:value-of select="//Setting[@Level=1]/NavigationIsBold/@Value" disable-output-escaping="yes"/>;
      }

      #sitemap.M0 li {
      <xsl:choose>
        <xsl:when test="//Setting[@Level=1]/NavigationImage/@Value = 'none'">
          list-style-image: <xsl:value-of select="//Setting[@Level=1]/NavigationImage/@Value" disable-output-escaping="yes"/>;
          list-style: <xsl:value-of select="//Setting[@Level=1]/NavigationImage/@Value" disable-output-escaping="yes"/>;
        </xsl:when>
        <xsl:otherwise>
          list-style-image: url('<xsl:value-of select="//Setting[@Level=1]/NavigationImage/@Value" disable-output-escaping="yes"/>');
        </xsl:otherwise>
      </xsl:choose>
      }

      #sitemap .M1 li a {
        font-family:<xsl:value-of select="//Setting[@Level=2]/NavigationFont/@Value" disable-output-escaping="yes"/>;
        font-size:<xsl:value-of select="//Setting[@Level=2]/NavigationFontSize/@Value" disable-output-escaping="yes"/>;
        color:<xsl:value-of select="//Setting[@Level=2]/NavigationFontColor/@Value" disable-output-escaping="yes"/>;
        font-weight:<xsl:value-of select="//Setting[@Level=2]/NavigationIsBold/@Value" disable-output-escaping="yes"/>;
      }

      #sitemap .M1 li {
      <xsl:choose>
        <xsl:when test="//Setting[@Level=2]/NavigationImage/@Value = 'none'">
          list-style-image: <xsl:value-of select="//Setting[@Level=2]/NavigationImage/@Value" disable-output-escaping="yes"/>;
          list-style: <xsl:value-of select="//Setting[@Level=2]/NavigationImage/@Value" disable-output-escaping="yes"/>;
        </xsl:when>
        <xsl:otherwise>
          list-style-image: url('<xsl:value-of select="//Setting[@Level=2]/NavigationImage/@Value" disable-output-escaping="yes"/>');
        </xsl:otherwise>
      </xsl:choose>
      }

      #sitemap .M2 li a {
        font-family:<xsl:value-of select="//Setting[@Level=3]/NavigationFont/@Value" disable-output-escaping="yes"/>;
        font-size:<xsl:value-of select="//Setting[@Level=3]/NavigationFontSize/@Value" disable-output-escaping="yes"/>;
        color:<xsl:value-of select="//Setting[@Level=3]/NavigationFontColor/@Value" disable-output-escaping="yes"/>;
        font-weight:<xsl:value-of select="//Setting[@Level=3]/NavigationIsBold/@Value" disable-output-escaping="yes"/>;
      }

      #sitemap .M2 li {
      <xsl:choose>
          <xsl:when test="//Setting[@Level=3]/NavigationImage/@Value = 'none'">
            list-style-image: <xsl:value-of select="//Setting[@Level=3]/NavigationImage/@Value" disable-output-escaping="yes"/>;
            list-style: <xsl:value-of select="//Setting[@Level=3]/NavigationImage/@Value" disable-output-escaping="yes"/>;
          </xsl:when>
          <xsl:otherwise>
            list-style-image: url('<xsl:value-of select="//Setting[@Level=3]/NavigationImage/@Value" disable-output-escaping="yes"/>');
          </xsl:otherwise>
        </xsl:choose>
      }

      #sitemap .M3 li a {
        font-family:<xsl:value-of select="//Setting[@Level=4]/NavigationFont/@Value" disable-output-escaping="yes"/>;
        font-size:<xsl:value-of select="//Setting[@Level=4]/NavigationFontSize/@Value" disable-output-escaping="yes"/>;
        color:<xsl:value-of select="//Setting[@Level=4]/NavigationFontColor/@Value" disable-output-escaping="yes"/>;
        font-weight:<xsl:value-of select="//Setting[@Level=4]/NavigationIsBold/@Value" disable-output-escaping="yes"/>;
      }

      #sitemap .M3 li {
      <xsl:choose>
          <xsl:when test="//Setting[@Level=4]/NavigationImage/@Value = 'none'">
            list-style-image: <xsl:value-of select="//Setting[@Level=4]/NavigationImage/@Value" disable-output-escaping="yes"/>;
            list-style: <xsl:value-of select="//Setting[@Level=4]/NavigationImage/@Value" disable-output-escaping="yes"/>;
          </xsl:when>
          <xsl:otherwise>
            list-style-image: url('<xsl:value-of select="//Setting[@Level=4]/NavigationImage/@Value" disable-output-escaping="yes"/>');
          </xsl:otherwise>
        </xsl:choose>
      }

      #sitemap .M4 li a {
        font-family:<xsl:value-of select="//Setting[@Level=5]/NavigationFont/@Value" disable-output-escaping="yes"/>;
        font-size:<xsl:value-of select="//Setting[@Level=5]/NavigationFontSize/@Value" disable-output-escaping="yes"/>;
        color:<xsl:value-of select="//Setting[@Level=5]/NavigationFontColor/@Value" disable-output-escaping="yes"/>;
        font-weight:<xsl:value-of select="//Setting[@Level=5]/NavigationIsBold/@Value" disable-output-escaping="yes"/>;
      }

      #sitemap .M4 li {
        <xsl:choose>
          <xsl:when test="//Setting[@Level=5]/NavigationImage/@Value = 'none'">
            list-style-image: <xsl:value-of select="//Setting[@Level=5]/NavigationImage/@Value" disable-output-escaping="yes"/>;
            list-style: <xsl:value-of select="//Setting[@Level=5]/NavigationImage/@Value" disable-output-escaping="yes"/>;
          </xsl:when>
          <xsl:otherwise>
            list-style-image: url('<xsl:value-of select="//Setting[@Level=5]/NavigationImage/@Value" disable-output-escaping="yes"/>');
          </xsl:otherwise>
        </xsl:choose>
      }

    </style>
    
    <ul class="M0" id="sitemap">
      <xsl:apply-templates select="Page">
        <xsl:with-param name="depth" select="1"/>
      </xsl:apply-templates>
    </ul>

  </xsl:template>

  <xsl:template match="Page">
    <xsl:param name="depth"/>
    <li>
      <a>
        <xsl:attribute name="href"><xsl:value-of select="@FriendlyHref" disable-output-escaping="yes"/></xsl:attribute>
        <xsl:value-of select="@MenuText"/>
      </a>
        <xsl:if test="count(Page)">
          <ul class="M{@AbsoluteLevel}">
            <xsl:apply-templates select="Page">
              <xsl:with-param name="depth" select="$depth+1"/>
            </xsl:apply-templates>
          </ul>
        </xsl:if>
    </li>
  </xsl:template>


</xsl:stylesheet>