; (function ($) {

	$(document).on('click', '.header-area .navbar-wrapper ul li', function () {
		$('.header-area .navbar-wrapper ul li').removeClass('active');
		$(this).toggleClass('active');
	})
	$(document).on('click', '.header-area .navbar-wrapper ul > li.active', function () {
		$(this).removeClass('active');
	})

	$(document).on('click', '.header-area .menu-bar', function () {
		$('.header-area .navbar-wrapper').addClass('active');
	})
	$(document).on('click', '.header-area .navbar-wrapper .close-menu-bar', function () {
		$('.header-area .navbar-wrapper').removeClass('active');
	})

	$(document).on("mouseenter", ".mega-menu-item", function(e) {
		const menu = e.target.getElementsByClassName('mega-menu')[0];
		if (menu) {
			menu.style.display = "block"
		}
	})
	$(document).on("mouseleave", ".mega-menu-inner", function(e) {
		const menu = e.target.offsetParent;
		if (menu) {
			menu.style.display = "none"
		}
	})


	// Testimonial Slider
	if ($('.testimonial-slider').length) {
		const swiper = new Swiper('.testimonial-slider', {
			// Optional parameters
			loop: true,
			spaceBetween: 30,
			slidesPerView: 1,

			// Navigation arrows
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			speed: 800, 
			easing: 'easeOutQuad',
		});
	}

	

	// Project Slider
	if ($('.project-slider').length) {
		const swiper2 = new Swiper(".project-slider", {
			spaceBetween: 24,
			centeredSlides: false,
			loop:false,
			items: 2,
			autoHeight: true,
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
			},
			breakpoints: {
				485: {
					// slidesPerView: 1,
				},
				768: {
					slidesPerView: 2,
				},
				1024: {
					slidesPerView: 3,
				}
			}
		});
	}

	// Contact Form Budget Slider

	if ($('#budget-value').length) {
		const value = document.querySelector("#budget-value");
		const input = document.querySelector("#pi_input");
		const budgetInput = document.querySelector('input[name="budget"]'); // Added this line
	
		value.textContent = input.value;
		budgetInput.value = input.value; // Store the budget value in the hidden input field
	
		input.addEventListener("input", (event) => {
			value.textContent = event.target.value;
			budgetInput.value = event.target.value; // Update the hidden input field when the user changes the budget
		});
	}
	

	var video = document.getElementById("myVideo");
	var btn = document.getElementById("myBtn");

	function myFunction() {
	if (video.paused) {
		video.play();
		btn.innerHTML = "Pause";
	} else {
		video.pause();
		btn.innerHTML = "Play";
	}
	}

	//Menu bar 
	
	if ($('.header-2').length) {
		$(window).scroll(function () {
			if ($(window).scrollTop() > 50) {
				$('.header-2').addClass('is-fixed');
			} else {
				$('.header-2').removeClass('is-fixed');
			}
		});
	}

})(jQuery)

// Service Cards PopIn Animation //
const observer = new IntersectionObserver(entries => {
	// Loop over the entries
	entries.forEach(entry => {
		// If the element is visible
		if (entry.isIntersecting) {
			// Add the animation class
			entry.target.classList.add('pop-in');
		}
	});
});

const cards = document.getElementsByClassName('service-card');

for (let i = 0; i < cards.length; i++) {
	observer.observe(cards.item(i));
}

// Slide-left Animation //

$(document).ready(function() {
    const animationElements = $('.animation-slide-left');
  
    function checkInView() {
      const windowHeight = $(window).height();
      const windowTop = $(window).scrollTop();
      const windowBottom = windowTop + windowHeight;
  
      animationElements.each(function() {
        const element = $(this);
        const elementTop = element.offset().top;
        const elementBottom = elementTop + element.outerHeight();
  
        if (elementBottom >= windowTop && elementTop <= windowBottom) {
          element.addClass('slide-left');
        }
      });
    }
    
    $(window).on('scroll resize', checkInView).trigger('scroll');
  });

// Slide-Right Animation //

$(document).ready(function() {
    const animationElements = $('.animation-slide-right');
  
    function checkInView() {
      const windowHeight = $(window).height();
      const windowTop = $(window).scrollTop();
      const windowBottom = windowTop + windowHeight;
  
      animationElements.each(function() {
        const element = $(this);
        const elementTop = element.offset().top;
        const elementBottom = elementTop + element.outerHeight();
  
        if (elementBottom >= windowTop && elementTop <= windowBottom) {
          element.addClass('slide-right');
        }
      });
    }
    
    $(window).on('scroll resize', checkInView).trigger('scroll');
  });

  // Scrolling-text-kayan-yazi //
  jQuery(document).ready(function($) {
	var promoticker = function() {
	  var window_width = window.innerWidth;
	  var speed = 10 * window_width;
	  $('#promo-notifications li:first').animate( {left: '-980px'}, speed, 'linear', function() {
		$(this).detach().appendTo('#promo-notifications ul').css('left', "100%");
		promoticker();
	  });
	};
	if ($("#promo-notifications li").length > 1) {
	  promoticker();
	}
  });


  //Define the placeholder where the text will be write in thanks to his id.
let placeholder = document.getElementById("text-write-erase");
//Stock all of the sentences pieces in an array.
let words = ["Spotify", "Apple Music", "TikTok", "Youtube","Tidal", "ve daha fazlası"];
//Initialize the index at the first element of the previously created array.
let index = 0;
function type(word){
    let i = 0;
		//Set the interval that makes the writing animation.
    let writing = setInterval(()=>{
				//Add the letter at the i index of the current word in the placeholder.
        placeholder.innerHTML += word.charAt(i);
        i ++;
				//If the i index reaches the end of the current word, the writing animation interval stops and the deleting animation beggins after a defined time.
        if(i>=word.length){
            clearInterval(writing);
            setTimeout(erase, 1000);
        }
    }, 75)

}

function erase(){
	//Set the interval that makes the deleting animation.
    let deleting = setInterval(() => {
				//Pop off the last character of the previously written sentence.
        placeholder.innerHTML = placeholder.innerHTML.slice(0,-1);
				//If no one single letter remains, the deleting animation interval stops.
        if(placeholder.innerHTML.length <= 0){
            clearInterval(deleting);
						//The index var increases by 1, the writing animation is about to start with the next sentence.
            index++;
						//If the index var reaches the end of the sentences array, set his value at 0 to looping from the first sentence of the array.
            if(index>=words.length){
                index = 0;
            }
            type(words[index])
        }
    
        
    }, 25);

}

//Start the whole animation.
type(words[index]);



