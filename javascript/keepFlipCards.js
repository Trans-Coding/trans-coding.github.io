// $(".btn-danger").click(function(){
//   buttonText = this.innerHTML;
//   var $flipCardHolders = $(document.querySelectorAll(".flip-card-holder"));
//   $flipCardHolders.each(function(){
//     var shouldKeepFlipCard = false;

//     $(this)
//       .find(".badge-primary")
//       .each(function(){
//       if(this.innerHTML == buttonText){
//         shouldKeepFlipCard = true;
//       }
//     });

//     if(shouldKeepFlipCard){
//       $(this).show();
//     }
//     else{
//       $(this).hide();
//     }
//   });
// });

$(".btn-danger-overlay").click(function(){
  buttonText = this.innerHTML;
  var $overlayHolders = $(document.querySelectorAll(".overlay-parent"));
  $overlayHolders.each(function(){
    var shouldKeepOverlay = false;

    $(this)
      .find(".badge-primary")
      .each(function(){
      if(this.innerHTML == buttonText){
        shouldKeepOverlay = true;
      }
    });

    if(shouldKeepOverlay){
      $(this).show();
    }
    else{
      $(this).hide();
    }
  });
});