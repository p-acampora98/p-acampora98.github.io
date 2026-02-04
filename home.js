$(function () {
  // Detect scroll of the navbar and modify it
  $(document).scroll(function () {
    var $nav = $("#topBar");
    var $photo = $(".cv-photo");
    var $logo = $(".logo");
    var $logoContainer = $("#logo-container");
    $nav.toggleClass("scrolled", $(this).scrollTop() > $nav.height());
    $photo.toggleClass("scrolled", $(this).scrollTop() > $nav.height());
    $logo.toggleClass("scrolled", $(this).scrollTop() > $nav.height());
    $logoContainer.toggleClass("scrolled", $(this).scrollTop() > $nav.height());
  });

  // Construct articles table
  $.getJSON("articles.json", function (data) {
    var tbl_body = document.createElement("tbody");
    var n = data.length;
    var arxivLogo =
      '<svg id="logomark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 74.492 100.25"><g id="tiny_-_red" data-name="tiny - red"><path d="M553.264,283.782l29.888-27.1a5.163,5.163,0,0,1,3.265-1.515,4.168,4.168,0,0,1,.544.037,6.622,6.622,0,0,1,4.18,3.251c.612,1.507.268,2.693-1.416,4.88l-26.858,31.724Z" transform="translate(-526.086 -245.559)" fill="#fff"/><path d="M586.417,255.912a3.534,3.534,0,0,1,.448.03,5.923,5.923,0,0,1,3.581,2.791c.454,1.116.314,2.023-1.315,4.14L562.865,293.9l-8.558-10.047,29.349-26.616a4.4,4.4,0,0,1,2.761-1.321m0-1.5a5.767,5.767,0,0,0-3.689,1.642l-.041.033-.039.035L553.3,282.738l-1.077.977.943,1.107,8.558,10.046,1.146,1.345,1.141-1.348,26.266-31.022.023-.027.021-.028c1.575-2.046,2.328-3.622,1.516-5.62a7.309,7.309,0,0,0-4.779-3.713,4.891,4.891,0,0,0-.64-.043Z" transform="translate(-526.086 -245.559)" fill="#b31b1b"/><path d="M577.758,289.555l-43.7-41.923s-1.671-2.029-3.437-2.071a4.49,4.49,0,0,0-4.23,2.718c-.688,1.651-.194,2.809,1.315,4.97l34.775,42.2-.017,0-25.884,31.793c-1.255,1.337-2.032,3.683-1.331,5.367a4.587,4.587,0,0,0,4.287,2.841,4.087,4.087,0,0,0,3.082-1.523l35.1-32.634A7.926,7.926,0,0,0,577.758,289.555Z" transform="translate(-526.086 -245.559)" fill="#b31b1b"/><path d="M595.193,345.06A4.725,4.725,0,0,1,592,343.741l-44.508-42.39c-3.656-3.656-3.48-8.728.424-12.632l5.569-5.211,9.486,11.158,35.517,42.75a4.44,4.44,0,0,1,1.188,4.115,4.85,4.85,0,0,1-3.22,3.338A4.353,4.353,0,0,1,595.193,345.06Z" transform="translate(-526.086 -245.559)" fill="#fff"/><path d="M553.423,284.593l8.977,10.558L597.911,337.9c.873,1.093,1.419,2.186,1.047,3.418a4.092,4.092,0,0,1-2.721,2.837,3.557,3.557,0,0,1-1.045.159,4,4,0,0,1-2.687-1.124L548.01,300.808c-3.5-3.5-2.971-8.151.436-11.558l4.977-4.657m.124-2.17L552.4,283.5l-4.976,4.656c-4.192,4.191-4.372,9.816-.473,13.714l44.521,42.4a5.485,5.485,0,0,0,3.722,1.538,5.1,5.1,0,0,0,1.483-.224,5.59,5.59,0,0,0,3.719-3.838,5.175,5.175,0,0,0-1.31-4.788l-35.53-42.767-8.988-10.571-1.019-1.2Z" transform="translate(-526.086 -245.559)" fill="#b31b1b"/><path d="M592.074,250.547" transform="translate(-526.086 -245.559)" fill="#fff" stroke="#000" stroke-miterlimit="10" stroke-width="0.25"/></g></svg>';
    var journalLogo =
      '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" /></svg>';
    $.each(data, function () {
      var tbl_row = tbl_body.insertRow();
      var numberCell = tbl_row.insertCell();
      numberCell.appendChild(document.createTextNode(n));
      n = n - 1;
      var that = this;
      $.each(this, function (k, v) {
        // console.log(k);
        if (k !== "journalLink") var cell = tbl_row.insertCell();
        switch (k) {
          case "authors":
            cell.appendChild(document.createTextNode("__, " + v.toString()));
            break;
          case "arxivLink":
            var container = document.createElement("div");
            container.style = "display:flex;";
            // create arxiv link (if avialable)
            if (that.arxivLink) {
              var arxivLink = document.createElement("a");
              arxivLink.innerHTML = arxivLogo;
              arxivLink.target = "_blank";
              arxivLink.href = v;
              container.appendChild(arxivLink);
            }
            // if available, create journal link
            if (that.journalLink) {
              var journalLink = document.createElement("a");
              journalLink.innerHTML = journalLogo;
              journalLink.target = "_blank";
              journalLink.href = that.journalLink;
              container.appendChild(journalLink);
            }
            cell.appendChild(container);
            break;
          case "journalLink":
            break;
          default:
            cell.appendChild(document.createTextNode(v.toString()));
        }
      });
    });
    $("#publicationsTable").append(tbl_body); //DOM table doesn't have .appendChild
  });
  


  // Construct teaching section
  $.getJSON("teaching.json", function(data){
    $.each(data, function(){
      var {name, cfu, year, course, programLink, exercisesLink, solvedExamsLink} = this;
      var courseMaterial = `
      <h2>${name} - ${cfu}</h2>
      <h4>A.A. ${year}, ${course}</h4>
      <div class="flex-link-container">
      <a class="svg-text" href="${programLink}">Programma del corso</a>
      <a class="svg-text" href="${exercisesLink}">Esercizi vari</a>
      <a class="svg-text" href="${solvedExamsLink}">Tracce d'esame</a>
      </div>
      `;
      $("#teaching-material").append(courseMaterial);
    })
    var downloadSvg = $("#download-svg");
    downloadSvg.clone().prependTo($('#teaching').find('a'))
  })


  // Open and close sidebar
  var $openButton = $("#sidebarOpenButton");
  var $navbar = $("#navbar");

  function openSidebar() {
    $navbar.addClass("show");
    $openButton.attr("aria-expanded", "true");
    $navbar.removeAttr("inert");
  }

  function closeSidebar() {
    $navbar.removeClass("show");
    $openButton.attr("aria-expanded", "false");
    if (isMobile) {
      $navbar.attr("inert", "");
    }
  }

  $openButton.on("click", openSidebar);
  $("#sidebarCloseButton").on("click", closeSidebar);
  $("#overlay").on("click", closeSidebar);
  $("nav a").on("click", closeSidebar);

  // Remove from navbar from taggable elements in case of small screen
  const media = window.matchMedia("(width<1000px)");
  var isMobile = media.matches;
  if (media.matches) {
    $navbar.attr("inert", "");
  }
  $(media).on("change", updateNavbar);

  function updateNavbar() {
    isMobile = this.matches;
    if (isMobile) {
      $navbar.attr("inert", "");
    } else {
      $navbar.removeAttr("inert");
    }
  }

  // Dark mode controls
  $("#lightSwitch-container").click(function () {
    $("#lightSwitch").toggleClass("dark");
    setTimeout(toggleDarkMode, 500);
  });

  function toggleDarkMode() {
    $("html").toggleClass("dark");
  }
});
