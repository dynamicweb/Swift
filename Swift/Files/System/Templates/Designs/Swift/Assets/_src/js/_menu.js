const Menu = function () {
	return {
		getMenuContentOffsetByParentRowPadding: function (menuElement) {
			const parentGridrow = menuElement.closest('[data-swift-gridrow]');
			const style = window.getComputedStyle(parentGridrow);
			return style.paddingBottom;
		},
		setMenuContentOffset: function (id) {
			const menuElement = document.getElementById(id);
			let offset = Menu.getMenuContentOffsetByParentRowPadding(menuElement);

			try {
				const paddingBottom = offset.match(/\d+/)[0];
				offset = parseInt(paddingBottom);
				const dropdownToggles = menuElement.querySelectorAll('[data-bs-toggle]');
				dropdownToggles.forEach((dropdownToggle) => {

					const offsetAttribute = `0, ${offset}`;
					dropdownToggle.dataset.bsOffset = offsetAttribute;
				});

				menuElement.style.setProperty('--swift-dynamic-offset', `${offset}px`);

			} catch (e) {
				console.error("Error setting offset on menu content:", e);
			}
		}
	}
}();

export { Menu };
