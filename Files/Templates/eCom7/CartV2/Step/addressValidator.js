
    function correctAddressFields(ValidatorId, AddressType) {
		var ctrl;
		if (AddressType == 'Billing')
		{
			ctrl = document.getElementById('addressValidator_' + ValidatorId + '_' + AddressType + '_City' );
			if (ctrl && document.getElementById('EcomOrderCustomerCity')) document.getElementById('EcomOrderCustomerCity').value = ctrl.value;
			ctrl = document.getElementById('addressValidator_' + ValidatorId + '_' + AddressType + '_Region' );
			if (ctrl && document.getElementById('EcomOrderCustomerRegion')) document.getElementById('EcomOrderCustomerRegion').value = ctrl.value;
			ctrl = document.getElementById('addressValidator_' + ValidatorId + '_' + AddressType + '_ZipCode' );
			if (ctrl && document.getElementById('EcomOrderCustomerZip')) document.getElementById('EcomOrderCustomerZip').value = ctrl.value;
			ctrl = document.getElementById('addressValidator_' + ValidatorId + '_' + AddressType + '_AddressLine1' );
			if (ctrl && document.getElementById('EcomOrderCustomerAddress')) document.getElementById('EcomOrderCustomerAddress').value = ctrl.value;
			ctrl = document.getElementById('addressValidator_' + ValidatorId + '_' + AddressType + '_AddressLine2' );
			if (ctrl && document.getElementById('EcomOrderCustomerAddress2')) document.getElementById('EcomOrderCustomerAddress2').value = ctrl.value;		
		}
		else
		{
			ctrl = document.getElementById('addressValidator_' + ValidatorId + '_' + AddressType + '_City' );
			if (ctrl && document.getElementById('EcomOrderDeliveryCity')) document.getElementById('EcomOrderDeliveryCity').value = ctrl.value;
			ctrl = document.getElementById('addressValidator_' + ValidatorId + '_' + AddressType + '_Region' );
			if (ctrl && document.getElementById('EcomOrderDeliveryRegion')) document.getElementById('EcomOrderDeliveryRegion').value = ctrl.value;
			ctrl = document.getElementById('addressValidator_' + ValidatorId + '_' + AddressType + '_ZipCode' );
			if (ctrl && document.getElementById('EcomOrderDeliveryZip')) document.getElementById('EcomOrderDeliveryZip').value = ctrl.value;
			ctrl = document.getElementById('addressValidator_' + ValidatorId + '_' + AddressType + '_AddressLine1' );
			if (ctrl && document.getElementById('EcomOrderDeliveryAddress')) document.getElementById('EcomOrderDeliveryAddress').value = ctrl.value;
			ctrl = document.getElementById('addressValidator_' + ValidatorId + '_' + AddressType + '_AddressLine2' );
			if (ctrl && document.getElementById('EcomOrderDeliveryAddress2')) document.getElementById('EcomOrderDeliveryAddress2').value = ctrl.value;		
		}
		
		ctrl = document.getElementById('addressValidatorFields_' + ValidatorId + '_' + AddressType );	
		if (ctrl) ctrl.style.display = 'none';	
    }
