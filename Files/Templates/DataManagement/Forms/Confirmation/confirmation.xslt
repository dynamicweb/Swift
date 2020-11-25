<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0"  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="xml" omit-xml-declaration="yes" indent="yes"  encoding="utf-8" />
	<xsl:variable name="formstatus" select="/Template/Form.SaveStatus" />

	<xsl:template match="/">
		<xsl:comment>
			Move the stylesheet to the mastertemplate
		</xsl:comment>
		<link rel="stylesheet" type="text/css" href="/files/templates/datamanagement/forms/pink.css" />
		<xsl:choose>
			<xsl:when test="$formstatus = 'Form saved'">
				<xsl:apply-templates select="Template/Form.Name" />
				<xsl:apply-templates select="Template" mode="formsaved" />
			</xsl:when>
			<xsl:otherwise>
				<xsl:apply-templates select="Template/Form.Name" />
				<xsl:apply-templates select="Template" mode="formnotsaved" />
			</xsl:otherwise>
		</xsl:choose>
		<xsl:call-template name="debug" />
	</xsl:template>
	
	<xsl:template match="Template[loop[@name='Form.Fields']/item]" mode="formsaved">
		<h3>Your data have been saved</h3>
		<table class="confirmation alternate" cellspacing="0" cellpadding="0">
			<thead>
				<tr>
					<th>Field</th>
					<th>Field value</th>
				</tr>
			</thead>
			<tbody>
				<xsl:apply-templates select="loop[@name='Form.Fields']/item[Field.Type != 'Hidden']" mode="formsaved" />
			</tbody>
		</table>
	</xsl:template>
	
	<xsl:template match="Template[loop[@name='Form.Fields']/item]" mode="formnotsaved">
		<h3>Houston we have a problem. Your data have NOT been saved.</h3>
		<xsl:value-of select="Form.Start" disable-output-escaping="yes" />
		<xsl:apply-templates select="Form.Hidden" />
		<xsl:apply-templates select="loop[@name='Form.Fields'][item]" />
		<input type="submit" value="submit" />
		<xsl:value-of select="Form.End" disable-output-escaping="yes" />
	</xsl:template>
	
	<xsl:template match="Form.Name">
		<h2>
			<xsl:value-of select="." disable-output-escaping="yes" />
		</h2>
	</xsl:template>
	
	<xsl:template match="item[Field.Type!='Hidden']" mode="formsaved">
		<tr>
			<xsl:attribute name="class">
				<xsl:value-of select="concat('listitem', position() mod 2)" disable-output-escaping="yes" />
			</xsl:attribute>
			<th>
				<xsl:value-of select="Field.Label" disable-output-escaping="yes" />
			</th>
			<td>
				<xsl:value-of select="Field.Value" disable-output-escaping="yes" />
			</td>
		</tr>
	</xsl:template>
	
	<xsl:template match="Form.Hidden">
		<xsl:value-of select="." disable-output-escaping="yes"/>
		<xsl:apply-templates select="../loop/item[Field.Type = 'Hidden']" />
	</xsl:template>
  
	<xsl:template match="item[Field.Type='Hidden' and Field.Active = 'True']">
		<xsl:apply-templates select="Field.Type" />
	</xsl:template>
	
	<xsl:template match="loop">
		<ul>
			<xsl:apply-templates select="item[Field.Type!='Hidden']" />
		</ul>
	</xsl:template>
  
	<xsl:template match="item[Field.Type!='Hidden' and Field.Active = 'True']">
		<li>
			<xsl:apply-templates select="Field.Label" />
			<xsl:apply-templates select="Field.Type" />
		</li>
	</xsl:template>
	
	<xsl:template match="Field.Label">
		<xsl:if test="../Field.Type != 'Hidden' or ../Field.Type != 'Hidden'">
			<label for="{../Field.Systemname}">
				<xsl:value-of select="." disable-output-escaping="yes" />
			</label>
		</xsl:if>
	</xsl:template>
	
	<xsl:template match="item[Field.Type='Radio'][loop/item]">
		<li>
			<fieldset>
				<legend>
					<xsl:value-of select="Field.Label" disable-output-escaping="yes" />
				</legend>
				<xsl:apply-templates select="Field.Type" />
			</fieldset>
		</li>
	</xsl:template>
  
	<xsl:template match="Field.Type[.='TextInput']">
		<xsl:element name="input" use-attribute-sets="basicfield">
			<xsl:attribute name="type">
				<xsl:text>text</xsl:text>
			</xsl:attribute>
		</xsl:element>
	</xsl:template>
	
	<xsl:template match="Field.Type[.='File']">
		<xsl:element name="input" use-attribute-sets="basicfield">
			<xsl:attribute name="type">
				<xsl:text>file</xsl:text>
			</xsl:attribute>
		</xsl:element>
	</xsl:template>
	
	<xsl:template match="Field.Type[.='CheckBox']">
		<xsl:element name="input" use-attribute-sets="basicfield">
			<xsl:attribute name="type">
				<xsl:text>checkbox</xsl:text>
			</xsl:attribute>
			<xsl:if test="Field.Option.Value = ../../Field.Value">
				<xsl:attribute name="checked">
					<xsl:text>checked</xsl:text>
				</xsl:attribute>
			</xsl:if>
		</xsl:element>
	</xsl:template>
	
	<xsl:template match="Field.Type[.='Hidden']">
		<xsl:element name="input" use-attribute-sets="basicfield">
			<xsl:attribute name="type">
				<xsl:text>hidden</xsl:text>
			</xsl:attribute>
		</xsl:element>
	</xsl:template>
	
	<xsl:template match="Field.Type[.='Textarea']">
		<xsl:element name="textarea">
			<xsl:attribute name="rows">
				<xsl:text>5</xsl:text>
			</xsl:attribute>
			<xsl:attribute name="cols">
				<xsl:text>30</xsl:text>
			</xsl:attribute>
			<xsl:attribute name="id">
				<xsl:value-of select="../Field.Systemname" />
			</xsl:attribute>
			<xsl:attribute name="name">
				<xsl:value-of select="../Field.Systemname" />
			</xsl:attribute>
			<xsl:choose>
				<xsl:when test="string-length(../Field.Value) != 0">
					<xsl:value-of select="../Field.Value" disable-output-escaping="yes" />
				</xsl:when>
				<xsl:otherwise>
					<xsl:text>Type here</xsl:text>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:element>
	</xsl:template>

	<xsl:template match="Field.Type[.='Select']">
		<xsl:element name="select" use-attribute-sets="select">
			<xsl:apply-templates select="../loop[@name='FieldOptions']/item" mode="select" />
		</xsl:element>
	</xsl:template>
	
	<xsl:template match="Field.Type[.='Radio']">
		<xsl:apply-templates select="../loop[@name='FieldOptions']/item" mode="radio"/>
	</xsl:template>

	<xsl:template match="Field.Type[.='DateTime']|Field.Type[.='Date']">
		<xsl:value-of select="../Field.Control" disable-output-escaping="yes" />
	</xsl:template>
	
	<xsl:template match="item" mode="select">
		<option value="{Field.Option.Value}">
			<xsl:if test="Field.Option.Value = ../../Field.Value">
				<xsl:attribute name="selected">
					<xsl:text>selected</xsl:text>
				</xsl:attribute>
			</xsl:if>
			<xsl:value-of select="Field.Option.Text" disable-output-escaping="yes" />
		</option>
	</xsl:template>
	
	<xsl:template match="item" mode="radio">
		<xsl:element name="input" use-attribute-sets="radio">
			<xsl:if test="Field.Option.Value = ../../Field.Value">
				<xsl:attribute name="checked">
					<xsl:text>checked</xsl:text>
				</xsl:attribute>
			</xsl:if>
		</xsl:element>
		<xsl:element name="span">
			<xsl:value-of select="Field.Option.Text" disable-output-escaping="yes" />
		</xsl:element>
		<xsl:element name="br" />
	</xsl:template>
	
	<xsl:template match="Field.Type|item">
		
	</xsl:template>
	
	<xsl:attribute-set name="basicfield">
		<xsl:attribute name="id">
			<xsl:value-of select="../Field.Systemname" disable-output-escaping="yes" />
		</xsl:attribute>
		<xsl:attribute name="name">
			<xsl:value-of select="../Field.Systemname" disable-output-escaping="yes" />
		</xsl:attribute>
		<xsl:attribute name="value">
			<xsl:value-of select="../Field.Value" disable-output-escaping="yes" />
		</xsl:attribute>
	</xsl:attribute-set>
	
	<xsl:attribute-set name="radio">
		<xsl:attribute name="name">
			<xsl:value-of select="../../Field.Systemname" disable-output-escaping="yes" />
		</xsl:attribute>
		<xsl:attribute name="type">
			<xsl:text>radio</xsl:text>
		</xsl:attribute>
		<xsl:attribute name="value">
			<xsl:value-of select="Field.Option.Value" />
		</xsl:attribute>
	</xsl:attribute-set>
	
	<xsl:attribute-set name="select">
		<xsl:attribute name="id">
			<xsl:value-of select="../Field.Systemname" />
		</xsl:attribute>
		<xsl:attribute name="name">
			<xsl:value-of select="../Field.Systemname" />
		</xsl:attribute>
	</xsl:attribute-set>
	
	<xsl:template name="debug">
		<xsl:if test="/Template/Server.Request.debugxml = 'true'">
			<textarea>
				<xsl:copy-of select="/" />
			</textarea>
		</xsl:if>
	</xsl:template>

</xsl:stylesheet>