
"use strict";


document.addEventListener('DOMContentLoaded', () => {

    //slider

    function swiperSlider() {
        const sliderInfo = document.querySelector('.info__slider');
        const sliderOffer = document.querySelector('.offer__slider');

        if (sliderInfo) {
            const swiper = new Swiper(sliderInfo, {
                slidesPerView: 1,
                spaceBetween: 10,
                // effect: 'fade',
                // fadeEffect: {
                //     crossFade: true
                // },
                allowTouchMove: true,
                loop: true,
                autoplay: {
                    delay: 4000,
                },
                pagination: {
                    el: '.swiper-pagination',
                    type: 'bullets',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            });
        }
        if (sliderOffer) {
            const swiper = new Swiper(sliderOffer, {
                slidesPerView: 1,
                spaceBetween: 10,
                // effect: 'fade',
                // fadeEffect: {
                //     crossFade: true
                // },
                autoHeight: true,
                allowTouchMove: true,
                loop: true,
                autoplay: {
                    delay: 4000,
                },

                pagination: {
                    el: '.swiper-pagination',
                    type: 'bullets',
                    clickable: true,
                },
            });
        }
    }
    swiperSlider();

    //=====================================================================


    // Burger

    function burgerClick() {
        const burger = document.querySelector('.header__burger');
        const contacts = document.querySelector('.header__contacts');
        const social = document.querySelector('.header__social');
        const body = document.body;

        const menuMobile = document.createElement('div');
        menuMobile.classList.add('menu-mobile');

        const topHead = document.createElement('div');
        topHead.classList.add('topHead');

        if (burger) {
            burger.addEventListener('click', () => {
                burger.classList.toggle('_active');
                body.classList.toggle('_active');
                menuMobile.classList.toggle('_active');
            });

            if (document.documentElement.clientWidth <= 700) {
                body.insertAdjacentElement('beforeend', menuMobile);
                menuMobile.insertAdjacentElement('beforeend', contacts);
                menuMobile.insertAdjacentElement('beforeend', social);
            }
        }
    }
    burgerClick();

    //============================================================================================



    // Tab Case

    function removeActiveTab(tabs) {
        for (let index = 0; index < tabs.length; index++) {
            const element = tabs[index];
            element.classList.remove('_active');
        }
    }

    function itemsDataset(items, tabs) {
        for (let index = 0; index < items.length; index++) {
            const el = items[index];
            if (el.dataset.content === tabs.dataset.tab) {
                el.classList.remove('_none');
                el.classList.add('_active');
            } else {
                el.classList.remove('_active');
                el.classList.add('_none');
            }

            if (tabs.dataset.tab === 'Все') {
                el.classList.add('_active');
                el.classList.remove('_none');
            }
        }
    }

    function tabCase() {
        const tabs = document.querySelectorAll('.portfolio__tab');
        const items = document.querySelectorAll('.portfolio__content-item');

        if (tabs.length > 0) {

            tabs[0].classList.add('_active');

            for (let index = 0; index < items.length; index++) {
                const element = items[index];
                element.classList.remove('_none');
                element.classList.add('_active');
            }
            for (let index = 0; index < tabs.length; index++) {
                const element = tabs[index];
                element.addEventListener('click', () => {
                    removeActiveTab(tabs);

                    element.classList.add('_active');

                    itemsDataset(items, element);
                });
            }
        }
    }
    tabCase();

    //======================================================================================================


    //Header Fixed

    function headerFixed() {
        const header = document.querySelector('.header');
        const height = header.clientHeight;
        const nextElement = header.nextElementSibling;
        const childrenNextElement = nextElement.children;

        window.addEventListener('scroll', () => {
            if (window.pageYOffset >= 200) {
                header.classList.add('_active');
            }
            else {
                if (window.pageYOffset < 200) {
                    header.classList.remove('_active');
                }
            }
            if (window.pageYOffset >= 400) {
                header.classList.add('_fixed');
                childrenNextElement[0].style.marginTop = `${height}px`;
            } else {
                if (window.pageYOffset < 400) {
                    // header.classList.remove('_active');
                    header.classList.remove('_fixed');
                    childrenNextElement[0].style.marginTop = ``;
                }
            }
        });
    }

    headerFixed();

    //================================================================================================



    // Btn Click


    function btnClick() {
        const btn = document.querySelectorAll("[data-btn]");
        const form = document.querySelector('.callback');
        const header = document.querySelector('.header');
        const headerHeight = header.clientHeight;

        if (btn.length > 0) {
            for (let index = 0; index < btn.length; index++) {
                const element = btn[index];
                element.addEventListener('click', (e) => {
                    e.preventDefault();
                    const elemPosition = form.offsetTop;
                    window.scrollTo({
                        top: elemPosition - headerHeight,
                        behavior: "smooth"
                    });
                });
            }
        }
    }
    btnClick();

    //================================================================================================



    // MAp visible

    function map() {
        const map = document.querySelector('.contacts');
        const mapPrevEl = document.querySelector('.callback');

        if (map) {
            const mapPos = mapPrevEl.offsetTop;

            window.addEventListener('scroll', () => {
                const windowHeight = document.documentElement.clientHeight;
                if (window.pageYOffset >= mapPos - windowHeight) {
                    map.classList.remove('_noActive');
                }
            });
        }
    }
    map();

    //================================================================================================



    // Form

    function formSend() {
        const form = document.querySelector('.callback__form form');
        const wrapper = document.querySelector('.callback__wrapper');

        form.addEventListener('click', (e) => {
            e.preventDefault();
            ajaxQuiz(form, wrapper);
        });
    }
    formSend();

    //========================================================================


    //Ajax


    function messageFormData() {
        const message = {
            loading: 'Загрузка ....',
            succes: 'Спасибо! Ваша заявка отправлена',
            failure: 'Что-то пошло не так... Попробуйте позже'
        };
        return message;
    }

    async function postData(url, data) {
        document.querySelector('._status').textContent = messageFormData().loading;
        let res = await fetch(url, {
            method: 'POST',
            body: data,
        });
        return await res;
    }

    function ajaxQuiz(form, wrapper) {
        let status = document.createElement('div');
        status.classList.add('_status');
        wrapper.appendChild(status);

        const formData = new FormData(form);
        postData('https://bisnes-design.ru/mail.php', formData)
            .then(res => {
                status.textContent = messageFormData().succes;
                form.reset();
                if (res.status === 200) {
                    // if (form.closest('.modal-price')) {
                    //     document.querySelector('[data-download]').click();
                    // }
                    status.textContent = messageFormData().succes;
                }
            })
            .catch(err => {
                status.textContent = messageFormData().failure;
            });
    }


    //====================================================================









});