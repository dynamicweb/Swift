if (typeof (Page) == 'undefined') {
	var Page = new Object();
}

Page.Login = new Object();

Page.Login.terminology = null;

Page.Login.initialize = function () {
    Page.Login.toggleLoginInformation();
    var errMsg = document.getElementById('EcomLoginError').innerHTML;
    if (errMsg !== '<!--@DW_extranet_error_uk-->' && errMsg !== '')
	{
		Page.Login.showLogin();
	}
	
	if (!Page.Login.terminology) {
		Page.Login.terminology = {};
		
		Page.Login.terminology.SpecifyEmail = document.getElementById('EcomLogin_SpecifyEmail').value;
		Page.Login.terminology.SpecifyUserName = document.getElementById('EcomLogin_SpecifyUserName').value;
		Page.Login.terminology.SpecifyPassword = document.getElementById('EcomLogin_SpecifyPassword').value;
	}
}

Page.Login.showLogin = function() {
	document.getElementById('EcomLogin').style.display = 'block';
	document.getElementById('EcomLoginHeader').style.display = 'none';
	document.getElementById('EcomLoginInformation').style.display = 'none';
	
	document.getElementById('EcomUserCreateNew').checked = false;
	Page.Login.hideForgotPassword();
}

Page.Login.hideLogin = function() {
	document.getElementById('EcomLogin').style.display = 'none';
	document.getElementById('EcomLoginHeader').style.display = 'block';
}

Page.Login.cancelLogin = function () {
    Page.Login.hideLogin();
    document.getElementById('EcomLogin_Password').value = '';
}

Page.Login.toggleLoginInformation = function() {
	if (document.getElementById('EcomUserCreateNew').checked)
		Page.Login.showLoginInformation();
	else
		Page.Login.hideLoginInformation();
}

Page.Login.showLoginInformation = function() {
	document.getElementById('EcomLoginInformation').style.display = 'block';
}

Page.Login.hideLoginInformation = function() {
	document.getElementById('EcomLoginInformation').style.display = 'none';
}

Page.Login.showForgotPassword = function() {
	document.getElementById('EcomLogin_Forgotpassword').value = 'True';

	document.getElementById('EcomLogin_UserName_Label').style.display = 'none';
	document.getElementById('EcomLogin_Email_Label').style.display = 'block';
	document.getElementById('EcomLogin_PasswordRow').style.display = 'none';
	document.getElementById('EcomLogin_AutoLoginRow').style.display = 'none';
	document.getElementById('EcomLogin_LoginBtn').style.display = 'none';
	document.getElementById('EcomLogin_GetPasswordBtn').style.display = 'inline-block';
	document.getElementById('EcomLogin_ForgotPasswordBtn').style.display = 'none';
}

Page.Login.hideForgotPassword = function() {
	document.getElementById('EcomLogin_Forgotpassword').value = 'False';

	document.getElementById('EcomLogin_UserName_Label').style.display = 'block';
	document.getElementById('EcomLogin_Email_Label').style.display = 'none';
	document.getElementById('EcomLogin_PasswordRow').style.display = 'block';
	document.getElementById('EcomLogin_AutoLoginRow').style.display = 'block';
	document.getElementById('EcomLogin_LoginBtn').style.display = 'inline-block';
	document.getElementById('EcomLogin_GetPasswordBtn').style.display = 'none';
	document.getElementById('EcomLogin_ForgotPasswordBtn').style.display = 'inline-block';
}

Page.Login.validateLoginBox  = function() {
	var ret = false;
	var txUserName = document.getElementById('EcomLogin_Username');
	var txPassword = document.getElementById('EcomLogin_Password');

	ret = !!(txUserName && txUserName.value && txUserName.value.length);
	if (!ret) {
		alert(Page.Login.terminology.SpecifyUserName);
	} else {
		ret = !!(txPassword && txPassword.value && txPassword.value.length);
		if (!ret) {
			alert(Page.Login.terminology.SpecifyPassword);
		}
	}
	
	return ret;
}

Page.Login.validateLoginForgotBox  = function() {
	var ret = false;
	var txUserName = document.getElementById('EcomLogin_Username');
	
	ret = !!(txUserName && txUserName.value && txUserName.value.length);
	if (!ret) {
		alert(Page.Login.terminology.SpecifyEmail);
	}
	
	return ret;
}