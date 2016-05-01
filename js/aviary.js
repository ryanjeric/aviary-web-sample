/* read the uploaded image. then add it instead of the preview image */
function readImage(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();    
        reader.onload = function (e) {
            $('#PrvImage').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);                           
    }
}
/* after upload call read image function*/
$(document).on('change', '#Image', function() {
 readImage(this);
});

/* edit Images using aviary */
var featherEditor = new Aviary.Feather({
                //DOCUMENTATION IS AVAILABLE HERE https://creativesdk.adobe.com/docs/web/#/articles/gettingstarted/index.html 
                apiKey: '3bd340a5f6f64126a9ecb1a9e757bc4c', // your api key , you can get one from http://developers.aviary.com/
                //THUTS MY API KEY U CUN USE THUT OR CREATE UR OWN..
                apiVersion: 3, // the api version .
                theme: 'dark', // 'light' or 'dark'
                tools: 'all',  // specify tools here.              
                appendTo: '',
                onSave: function(imageID, newURL) {
                    var img = document.getElementById(imageID);
                    img.src = newURL; // after save, replacs the image with the new one from aviary.com
                },
                onError: function(errorObj) { 
                    alert(errorObj.message);
                },
            });
function launchEditor(id, src) {
    featherEditor.launch({
        image: id,
        url: src
    });
    return false;
}

/* replace the privew image with the new uploaded image, then send it to aviary javascript code */
$(document).on('click', '#editPrvImage', function() {
 var url =$('#PrvImage').attr("src");
 return launchEditor('PrvImage', url);  
});


/// BOOTRAP FOR FILE UPLOAD DESIGN
$(document).on('click', '.browse', function(){
  var file = $(this).parent().parent().parent().find('.file');
  file.trigger('click');
});
$(document).on('change', '.file', function(){
  $(this).parent().find('.form-control').val($(this).val().replace(/C:\\fakepath\\/i, ''));
});