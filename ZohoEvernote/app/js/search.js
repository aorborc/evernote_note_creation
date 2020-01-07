ZOHO.embeddedApp.on("PageLoad",function(data)
{
  console.log(data);
  $(document).ready(function(){
    $(".hello").on("click", function(e) {
      e.preventDefault();
        $("#searchPage").hide();
        $("#createNewPage").show();
    });
    $(".goToSearch").on("click", function(e) {
      e.preventDefault();
      $("#searchPage").show();
      $("#createNewPage").hide();
    });

    $("#search").keypress(function(event){
          
          if(event.keyCode == '13'){
            // console.log("fgcgh");
            $("#searchPage").hide();
            $("#form-search").show();
          }
    });

    $(".front-page").on("click", function(e) {
      e.preventDefault();
      $("#searchPage").show();
      $("#form-search").hide();
    });
    

    $(".addNote").on("click",function(e){
      e.preventDefault();
    // $("#divpopup").toggle("show");
    var noteTitle = $('#noteTitle').val();
    console.log(noteTitle);
    var noteContent = $('#noteContent').val();
    
    // if(noteTitle == '' && noteContent == '') {
    //   alert("Please enter details");
  
    // }
    // else{
      var func_name = "sampleextension21__createnote";
        var req_data ={
          "arguments": JSON.stringify({
              "noteTitle" : noteTitle,
              "noteContent":noteContent
          })

      };
      ZOHO.CRM.FUNCTIONS.execute(func_name, req_data)
      .then(function(data){
          console.log(data);
      //     alert("Successfully added one Note");
      // $("#createNewPage").hide();
      // $("#searchPage").show();
      // // else{
      //   alert("Successfully added one Note");
      //   $("#createNewPage").hide();
      //   $("#searchPage").show();
      // }
      });
    // }
   
   });

  });

});

ZOHO.embeddedApp.init();



