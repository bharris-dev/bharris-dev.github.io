function displayText(button) {
			const content = button.parentElement.nextElementSibling;
			const isHidden = content.style.display !== 'block';
			const sectionId = button.parentElement.dataset.id;

			// If isHidden true, reveal block of text : If isHidden false, set it as none
			content.style.display = isHidden ? 'block' : 'none';
			// If isHidden true, button + : If isHidden false, button -
			button.textContent = isHidden ? '-' : '+';

			button.classList.toggle('active', isHidden);

			if (sectionId){
				sessionStorage.setItem(sectionId, isHidden ? 'expanded' : 'collapsed');
			}
		}

		window.addEventListener('DOMContentLoaded', () => {
			document.querySelectorAll('.btn').forEach(button => {
				const sectionId = button.parentElement.dataset.id;
				const savedState = sectionId && sessionStorage.getItem(sectionId);
				const content = button.parentElement.nextElementSibling;

				if (savedState === 'expanded') {
					content.style.display = 'block';
					button.textContent = '-';
					button.classList.add('active');
				}
			});
		});