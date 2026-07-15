document.addEventListener('DOMContentLoaded', () => {

    const initSwiperModule = () => {
        const swiperEl = document.querySelector('.banners__swiper');

        if (!swiperEl || typeof Swiper === 'undefined') {
            return;
        }

        new Swiper(swiperEl, {
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false
            },
            pagination: {
                el: '.banners__swiper-pagination',
                clickable: true
            },
            navigation: {
                prevEl: '.banners__slider-arrow--prev',
                nextEl: '.banners__slider-arrow--next'
            }
        });
    };

    const showCatalogeModule = () => {
        const catalogButton = document.querySelector('.header__catalog-button');
        const catalogMenu = document.getElementById('catalog-menu');

        if (!catalogButton || !catalogMenu) {
            return;
        }

        const lockBodyScroll = () => {
            document.body.style.overflow = 'hidden';
        };

        const unlockBodyScroll = () => {
            document.body.style.overflow = '';
        };

        const handleOutsideClick = (event) => {
            const isClickInsideMenu = catalogMenu.contains(event.target);
            const isClickOnButton = catalogButton.contains(event.target);

            if (!isClickInsideMenu && !isClickOnButton) {
                closeMenu();
            }
        };

        const handleEscape = (event) => {
            if (event.key === 'Escape' || event.key === 'Esc') {
                closeMenu();
                catalogButton.focus();
            }
        };

        const openMenu = () => {
            catalogMenu.hidden = false;
            catalogButton.setAttribute('aria-expanded', 'true');
            lockBodyScroll();

            document.addEventListener('click', handleOutsideClick);
            document.addEventListener('keydown', handleEscape);
        };

        const closeMenu = () => {
            catalogMenu.hidden = true;
            catalogButton.setAttribute('aria-expanded', 'false');
            unlockBodyScroll();

            document.removeEventListener('click', handleOutsideClick);
            document.removeEventListener('keydown', handleEscape);
        };

        catalogButton.addEventListener('click', () => {
            const isOpen = catalogButton.getAttribute('aria-expanded') === 'true';
            isOpen ? closeMenu() : openMenu();
        });

        const tabs = catalogMenu.querySelectorAll('.catalog-menu__categories-link');
        const panels = catalogMenu.querySelectorAll('.catalog-menu__panel');

        if (!tabs.length || !panels.length) {
            return;
        }

        const activateTab = (tab) => {
            const targetTab = tab.getAttribute('data-catalog-tab');
            const targetPanelId = `catalog-panel-${targetTab}`;

            tabs.forEach((item) => {
                const isActive = item === tab;
                item.classList.toggle('catalog-menu__categories-link--active', isActive);
                item.setAttribute('aria-selected', isActive ? 'true' : 'false');
            });

            panels.forEach((panel) => {
                panel.hidden = panel.id !== targetPanelId;
            });
        };

        tabs.forEach((tab) => {
            tab.addEventListener('mouseenter', () => activateTab(tab));
            tab.addEventListener('focus', () => activateTab(tab));
            tab.addEventListener('click', (event) => {
                event.preventDefault();
                activateTab(tab);
            });
        });
    };

    const initPromoModule = () => {
        const toggle = document.querySelector('.topup__promo-toggle');
        const field = document.getElementById('topup-promo-field');

        if (!toggle || !field) {
            return;
        }

        toggle.addEventListener('click', () => {
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

            toggle.setAttribute('aria-expanded', String(!isExpanded));
            field.hidden = isExpanded;

            if (!isExpanded) {
                field.querySelector('input')?.focus();
            }
        });
    };

    const changeCurrencyModule = () => {
        const currencyButtons = document.querySelectorAll('.topup__currency-item');
        const submitButton = document.querySelector('.topup__submit');
        const amountInput = document.getElementById('topup-amount');

        if (!currencyButtons.length || !amountInput) {
            return;
        }

        const activeButton = document.querySelector('.topup__currency-item--active');
        let activeCurrency = activeButton?.getAttribute('data-currency') || '$';

        const getRawAmount = (value) => value.replace(/[^\d]/g, '') || '0';

        const renderAmountInput = (rawAmount) => {
            amountInput.value = `${rawAmount} ${activeCurrency}`;
        };

        const updateSubmitButton = (rawAmount) => {
            if (!submitButton) {
                return;
            }

            submitButton.textContent = `Оплатить ${rawAmount}${activeCurrency}`;
        };

        const syncAmountState = (rawAmount) => {
            renderAmountInput(rawAmount);
            updateSubmitButton(rawAmount);
        };

        amountInput.addEventListener('input', () => {
            const rawAmount = getRawAmount(amountInput.value);
            syncAmountState(rawAmount);
        });

        amountInput.addEventListener('focus', () => {
            amountInput.select();
        });

        currencyButtons.forEach((button) => {
            button.addEventListener('click', () => {
                currencyButtons.forEach((item) => {
                    item.classList.remove('topup__currency-item--active');
                    item.setAttribute('aria-pressed', 'false');
                });

                button.classList.add('topup__currency-item--active');
                button.setAttribute('aria-pressed', 'true');

                activeCurrency = button.getAttribute('data-currency') || button.textContent.trim();

                const rawAmount = getRawAmount(amountInput.value);
                syncAmountState(rawAmount);
            });
        });

        syncAmountState(getRawAmount(amountInput.value));
    };

    const initFiltersModule = () => {
        const buttons = document.querySelectorAll('.filters__button');

        if (!buttons.length) {
            return;
        }

        buttons.forEach((button) => {
            button.addEventListener('click', () => {
                const isPressed = button.getAttribute('aria-pressed') === 'true';
                button.setAttribute('aria-pressed', String(!isPressed));
            });
        });
    };

    initSwiperModule();
    showCatalogeModule();
    initPromoModule();
    changeCurrencyModule();
    initFiltersModule();

});