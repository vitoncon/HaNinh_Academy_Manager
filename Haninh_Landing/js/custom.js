AOS.init({
	duration: 800,
	easing: 'slide',
	once: true
});

$(function(){

	'use strict';

	$(".loader").delay(200).fadeOut("slow");
	$("#overlayer").delay(200).fadeOut("slow");	

	var siteMenuClone = function() {

		$('.js-clone-nav').each(function() {
			var $this = $(this);
			$this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
		});


		setTimeout(function() {
			
			var counter = 0;
			$('.site-mobile-menu .has-children').each(function(){
				var $this = $(this);
				
				$this.prepend('<span class="arrow-collapse collapsed">');

				$this.find('.arrow-collapse').attr({
					'data-toggle' : 'collapse',
					'data-target' : '#collapseItem' + counter,
				});

				$this.find('> ul').attr({
					'class' : 'collapse',
					'id' : 'collapseItem' + counter,
				});

				counter++;

			});

		}, 1000);

		$('body').on('click', '.arrow-collapse', function(e) {
			var $this = $(this);
			if ( $this.closest('li').find('.collapse').hasClass('show') ) {
				$this.removeClass('active');
			} else {
				$this.addClass('active');
			}
			e.preventDefault();  
			
		});

		$(window).resize(function() {
			var $this = $(this),
			w = $this.width();

			if ( w > 768 ) {
				if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
				}
			}
		})

		$('body').on('click', '.js-menu-toggle', function(e) {
			var $this = $(this);
			e.preventDefault();

			if ( $('body').hasClass('offcanvas-menu') ) {
				$('body').removeClass('offcanvas-menu');
				$('body').find('.js-menu-toggle').removeClass('active');
			} else {
				$('body').addClass('offcanvas-menu');
				$('body').find('.js-menu-toggle').addClass('active');
			}
		}) 

		// click outisde offcanvas
		$(document).mouseup(function(e) {
			var container = $(".site-mobile-menu");
			if (!container.is(e.target) && container.has(e.target).length === 0) {
				if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
					$('body').find('.js-menu-toggle').removeClass('active');
				}
			}
		});
	}; 
	siteMenuClone();

	var owlPlugin = function() {
		if ( $('.owl-3-slider').length > 0 ) {
			var owl3 = $('.owl-3-slider').owlCarousel({
				loop: true,
				autoHeight: true,
				margin: 40,
				autoplay: true,
				smartSpeed: 700,
				items: 4,
				stagePadding: 0,
				nav: true,
				dots: true,
				navText: ['<span class="icon-keyboard_backspace"></span>','<span class="icon-keyboard_backspace"></span>'],
				responsive:{
					0:{
						items:1
					},
					600:{
						items:1
					},
					800: {
						items:2
					},
					1000:{
						items:2
					},
					1100:{
						items:3
					}
				}
			});
		}
		$('.js-custom-next-v2').click(function(e) {
			e.preventDefault();
			owl3.trigger('next.owl.carousel');
		})
		$('.js-custom-prev-v2').click(function(e) {
			e.preventDefault();
			owl3.trigger('prev.owl.carousel');
		})
		if ( $('.owl-4-slider').length > 0 ) {
			var owl4 = $('.owl-4-slider').owlCarousel({
				loop: true,
				autoHeight: true,
				margin: 10,
				autoplay: true,
				smartSpeed: 700,
				items: 4,
				nav: false,
				dots: true,
				navText: ['<span class="icon-keyboard_backspace"></span>','<span class="icon-keyboard_backspace"></span>'],
				responsive:{
					0:{
						items:1
					},
					600:{
						items:2
					},
					800: {
						items:2
					},
					1000:{
						items:3
					},
					1100:{
						items:4
					}
				}
			});
		}
		

		if ( $('.owl-single-text').length > 0 ) {
			var owlText = $('.owl-single-text').owlCarousel({
				loop: true,
				autoHeight: true,
				margin: 0,
				autoplay: true,
				smartSpeed: 1200,
				items: 1,
				nav: false,
				navText: ['<span class="icon-keyboard_backspace"></span>','<span class="icon-keyboard_backspace"></span>']
			});
		}

		if ( $('.events-slider').length > 0 ) {
			var owl = $('.events-slider').owlCarousel({
				loop: true,
				autoHeight: true,
				margin: 0,
				autoplay: true,
				smartSpeed: 800,
				mouseDrag: false,
				touchDrag: false,
				items: 1,
				nav: false,
				navText: ['<span class="icon-keyboard_backspace"></span>','<span class="icon-keyboard_backspace"></span>'],
			});
		}
		if ( $('.owl-single').length > 0 ) {

			var owl = $('.owl-single').owlCarousel({
				loop: true,
				autoHeight: true,
				margin: 0,
				autoplay: true,
				smartSpeed: 800,
				mouseDrag: false,
				touchDrag: false,
				items: 1,
				nav: false,
				navText: ['<span class="icon-keyboard_backspace"></span>','<span class="icon-keyboard_backspace"></span>'],
				onChanged: changed,
			});

			function changed(event) {
				var i = event.item.index;

				if ( i == 0 || i == null) {
					i = 1;
				} else {
					i = i - 1;

					$('.js-custom-dots li').removeClass('active');
					$('.js-custom-dots li[data-index="'+i+'"]').addClass('active');
				}				
			}

			$('.js-custom-dots li').each(function(i) {

				var i = i + 1;
				$(this).attr('data-index', i);
			});

			$('.js-custom-dots a').on('click', function(e){
				e.preventDefault();
				owl.trigger('stop.owl.autoplay');
				var k = $(this).closest('li').data('index');
				k = k - 1;
				owl.trigger('to.owl.carousel', [k, 500]);
			})

		}


		if ( $('.wide-slider-testimonial').length > 0 ) {
			$('.wide-slider-testimonial').owlCarousel({
				loop:true,
				autoplay: true,
				margin:0,
				nav: false,
				autoplayHoverPause: false,
				items: 1,
				smartSpeed: 1000,
				autoHeight: true,
				navText : ["<span class='ion-android-arrow-dropleft'></span>","<span class='ion-android-arrow-dropright'></span>"],
				responsive:{
					0:{
						items:1,
						nav:false
					},
					600:{
						items:1,
						nav:false
					},
					1000:{
						items:1,
						nav:false
					}
				}
			});
		}

	}
	owlPlugin();

	var counter = function() {
		
		$('.count-numbers').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ut-animated') ) {

				var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
				$('.counter > span').each(function(){
					var $this = $(this),
					num = $this.data('number');
					$this.animateNumber(
					{
						number: num,
						numberStep: comma_separator_number_step
					}, 5000
					);
				});
				
			}

		} , { offset: '95%' } );

	}
	counter();

	// jarallax
	var jarallaxPlugin = function() {
		if ( $('.jarallax').length > 0 ) {
			$('.jarallax').jarallax({
				speed: 0.2
			});
		}
	};
	jarallaxPlugin();

	

	var accordion = function() {
		$('.btn-link[aria-expanded="true"]').closest('.accordion-item').addClass('active');
		$('.collapse').on('show.bs.collapse', function () {
			$(this).closest('.accordion-item').addClass('active');
		});

		$('.collapse').on('hidden.bs.collapse', function () {
			$(this).closest('.accordion-item').removeClass('active');
		});
	}
	accordion();

	var siteDatePicker = function() {

		if ( $('.datepicker').length > 0 ) {
			$('.datepicker').datepicker();
		}
	};
	siteDatePicker();

	var siteSticky = function() {
		$(".js-sticky-header").sticky({topSpacing:0});
	};
	siteSticky();


	// Load featured courses from backend API for landing page
	var allFeaturedCourses = [];
	var loadFeaturedCourses = function() {
		var $list = $('#featured-courses-list');
		if ($list.length === 0) return;

		var renderEmpty = function(message) {
			$list.empty();
			$list.append(
				'<div class="col-12 text-center">' +
					'<p>' + message + '</p>' +
				'</div>'
			);
		};
		var renderCourses = function(courses) {
	if (!courses || !courses.length) {
		renderEmpty('Hiện chưa có khóa học.');
		return;
	}
	var limited = courses.slice(0, 6);
	allFeaturedCourses = limited;
	$list.empty();
	limited.forEach(function(course, index) {
		// Fix tên field từ backend
		var title = course.course_name || course.name || 'Khóa học ngoại ngữ';
		var description = course.description || '';
		var language = course.language || '';
		// Duration
		var duration = '';
		if (course.duration_weeks) {
			duration = course.duration_weeks + ' tuần';
		}
		// Price format
		var price = '';
		if (course.tuition_fee) {
			price = Number(course.tuition_fee).toLocaleString('vi-VN') + ' VNĐ';
		}
		var imageMap = {
			'Tiếng Anh': 'images/course-english.jpg',
			'Tiếng Trung': 'images/course-chinese.jpg',
			'Tiếng Hàn': 'images/course-korean.jpg'
		};

		var image = imageMap[language] || 'images/img-school-1-min.jpg';
		var delay = (index % 3) * 100;
		var altText = 'Khóa học ' + title + ' tại Trung tâm Ngoại ngữ Hà Ninh';
		var card =
			'<div class="col-12 col-sm-6 col-lg-4 mb-4" data-aos="fade-up" data-aos-delay="' + delay + '">' +
				'<div class="custom-media d-block h-100">' +
					'<a href="#courses" class="d-block">' +
						'<img src="' + image + '" alt="' + altText + '" class="img-fluid" loading="lazy">' +
					'</a>' +
					'<div class="custom-media-body">' +
						'<div class="d-flex justify-content-between pb-2">' +
							'<div class="text-primary">' +
								'<span class="uil uil-book-open"></span> ' + duration +
							'</div>' +
							'<div class="price text-right">' +
								'<strong>' + price + '</strong>' +
							'</div>' +
						'</div>' +
						'<h3 class="mb-2">' + title + '</h3>' +

						'<p class="mb-2">' + description + '</p>' +

						(language ? '<p class="mb-3"><small>Ngôn ngữ: ' + language + '</small></p>' : '') +

						'<p>' +
							'<a href="javascript:void(0)" onclick="showCourseDetails(' + index + ')" class="btn btn-outline-primary btn-sm">Xem chi tiết</a>' +
						'</p>' +

					'</div>' +
				'</div>' +
			'</div>';
		$list.append(card);
	});
};
fetch('http://localhost:10093/api/public/courses')

	.then(function(response) {
		if (!response.ok) {
			throw new Error('API error');
		}
		return response.json();
	})

	.then(function(data) {

		var courses = [];

		if (Array.isArray(data)) {
			courses = data;
		}
		else if (Array.isArray(data.content)) {
			courses = data.content;
		}
		else if (Array.isArray(data.data)) {
			courses = data.data;
		}
		renderCourses(courses);

	})
	.catch(function(error) {

		console.error('Load courses error:', error);

		renderEmpty('Không thể tải khóa học.');

	});
	};
	loadFeaturedCourses();
	
	window.showCourseDetails = function(index) {
		var course = allFeaturedCourses[index];
		if (!course) return;

		var title = course.course_name || course.name || 'Khóa học ngoại ngữ';
		var description = course.description || 'Chưa có mô tả chi tiết cho khóa học này.';
		var language = course.language || '';
		var duration = course.duration_weeks ? course.duration_weeks + ' tuần' : 'Liên hệ';
		var price = course.tuition_fee ? Number(course.tuition_fee).toLocaleString('vi-VN') + ' VNĐ' : 'Liên hệ';

		var imageMap = {
			'Tiếng Anh': 'images/course-english.jpg',
			'Tiếng Trung': 'images/course-chinese.jpg',
			'Tiếng Hàn': 'images/course-korean.jpg'
		};
		var image = imageMap[language] || 'images/img-school-1-min.jpg';

		$('#modalCourseTitle').text(title);
		$('#modalCourseDescription').html(description.replace(/\n/g, '<br>'));
		$('#modalCourseImage').attr('src', image);
		$('#modalCourseImage').attr('alt', 'Khóa học ' + title);
    // Create placeholders for other fields if needed (duration, price, language)
    $('#modalCourseDuration').text(course.duration_weeks ? course.duration_weeks + ' tuần' : 'Liên hệ');
    $('#modalCourseLanguage').text(course.language || 'Tiếng Anh');
    
    const formattedPrice = course.tuition_fee ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(course.tuition_fee) : 'Liên hệ';
    $('#modalCoursePrice').text(formattedPrice);

    // Set course ID for registration form
    $('#regCourseId').val(course.id);
    
    // Ensure form is hidden when opening modal
    $('#registrationFormSection').hide();
    $('#courseDetailsContent').show();
    $('#startRegBtn').show().text('Đăng ký tư vấn'); // Reset button text
    $('#registrationMessage').addClass('d-none');

    // Show the modal
    $('#courseModal').modal('show');
}

/**
 * Open registration modal for general consultation (no specific course)
 * @param {string} context - The context of consultation (e.g. 'Học phí', 'Kiểm tra đầu vào')
 */
window.openConsultation = function openConsultation(context) {
    // Reset modal state
    $('#modalCourseTitle').text(context || 'Tư vấn học tập');
    $('#modalCourseDescription').html('Vui lòng để lại thông tin, đội ngũ Hà Ninh Academy sẽ liên hệ tư vấn chi tiết cho bạn về <strong>' + (context || 'lộ trình học tập') + '</strong>.');
    $('#modalCourseImage').attr('src', 'images/hero-img-1-min.jpg'); // Default brand image
    $('#modalCourseDuration').text('Theo nhu cầu');
    $('#modalCoursePrice').text('Tư vấn miễn phí');
    $('#modalCourseLanguage').text('Anh/Trung/Hàn');
    
    // Set course ID to empty for general inquiries
    $('#regCourseId').val('');
    
    // UI states
    $('#courseDetailsContent').show();
    $('#registrationFormSection').hide();
    $('#startRegBtn').show().text('Nhận tư vấn ngay');
    $('#registrationMessage').addClass('d-none');
    
    // Show modal
    $('#courseModal').modal('show');
};

/**
 * Toggle between course details and registration form in the modal
 * @param {boolean} showForm 
 */
window.toggleRegistrationForm = function toggleRegistrationForm(showForm) {
    if (showForm) {
        $('#courseDetailsContent').fadeOut(200, function() {
            $('#registrationFormSection').fadeIn(200);
            $('#startRegBtn').hide();
            // Fill subtitle with course name
            const courseTitle = $('#modalCourseTitle').text();
            $('#regCourseSubtitle').text('Khóa học: ' + courseTitle);
        });
    } else {
        $('#registrationFormSection').fadeOut(200, function() {
            $('#courseDetailsContent').fadeIn(200);
            $('#startRegBtn').show();
            // Reset message
            $('#registrationMessage').addClass('d-none').removeClass('alert-success alert-danger');
        });
    }
};

// Handle registration form submission
$(document).ready(function() {
    $('#courseRegistrationForm').on('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = $('#submitRegistrationBtn');
        const messageDiv = $('#registrationMessage');
        const apiBaseUrl = 'http://localhost:10093/api/public'; // Use absolute URL for landing page
        
        // Show loading state
        submitBtn.prop('disabled', true);
        $('#btnRegText').addClass('d-none');
        $('#btnRegSpinner').removeClass('d-none');
        messageDiv.addClass('d-none');

        const formData = {
            fullname: $('#regFullname').val(),
            phone: $('#regPhone').val(),
            email: $('#regEmail').val(),
            course_id: $('#regCourseId').val(),
            message: $('#regMessage').val()
        };

        fetch(`${apiBaseUrl}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                throw new Error(data.error);
            }
            // Success
            messageDiv.removeClass('d-none alert-danger').addClass('alert-success d-block').text(data.message || 'Đăng ký thành công! Chúng tôi sẽ liên hệ sớm.');
            $('#courseRegistrationForm')[0].reset();
            
            // Auto close after 3 seconds
            setTimeout(() => {
                $('#courseModal').modal('hide');
                // Reset state for next time
                setTimeout(() => toggleRegistrationForm(false), 500);
            }, 3000);
        })
        .catch(error => {
            messageDiv.removeClass('d-none alert-success').addClass('alert-danger d-block').text(error.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.');
        })
        .finally(() => {
            submitBtn.prop('disabled', false);
            $('#btnRegText').removeClass('d-none');
            $('#btnRegSpinner').addClass('d-none');
        });
    });
});

	// AI chat behavior moved to js/ai-chat.js

})