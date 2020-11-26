CKEDITOR.editorConfig = function (config) {
	// Define changes to default configuration here.
	// For the complete reference:
	// http://docs.ckeditor.com/#!/api/CKEDITOR.config

	// The toolbar groups arrangement, optimized for two toolbar rows.
	config.toolbarGroups = [
		{ name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
		{ name: 'links' },
		{ name: 'insert' },
		{ name: 'tools' },
		{ name: 'document', groups: [ 'mode' ] },
		'/',
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'paragraph', groups: [ 'list', 'indent', 'align' ] },
		{ name: 'styles' },
		{ name: 'colors' }
	];

	// Remove some buttons, provided by the standard plugins, which we don't need to have in the Standard(s) toolbar.
	//config.removeButtons = 'Strike,Underline,Subscript,Superscript,Indent,Outdent,Styles';
	config.removeButtons = 'Styles,Flash,CodeSnippet,Save,NewPage,Preview,Print,Templates,NewPage,Save';

	config.entities = false;

	config.filebrowserBrowseUrl = '/Admin/Editor/ckeditor/browser.aspx?type=link';
	config.filebrowserImageBrowseUrl = '/Admin/Editor/ckeditor/browser.aspx?type=image';

	config.wordcount = {
	    countHTML: false,           // Whether or not to include Html chars in the Char Count
	    maxWordCount: -1,           // Maximum allowed Word Count, -1 is default for unlimited
	    maxCharCount: -1,           // Maximum allowed Char Count, -1 is default for unlimited
	    showCharCount: true,        // Whether or not you want to show the Char Count
	    showWordCount: false,       // Whether or not you want to show the Word Count
	    showParagraphs: false,      // Whether or not you want to show the Paragraphs Count
	    countSpacesAsChars: true,   // Whether or not you want to count Spaces as Chars
	};
};
