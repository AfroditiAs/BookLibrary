$(function() {
    $("#addForm").on("submit", function(e) {
        $.ajax({
            type: "POST",
            url: "/books",
            data: $("#addForm").serialize(), // serializes the form's elements.
            success: function(data) {
                console.log(data);
                alert('The book with id ' + data.insertId + ' has been inserted!');
            },
            error: function(err) {
                console.log(err);
                alert('Something went wrong!');
            }
        });
        e.preventDefault();
    });


    $("#searchForm").on("submit", function(e) {
        var searchTerm = this.elements.search.value;
        $.ajax({
            type: "GET",
            url: "/books/" + searchTerm,
            success: function(data) {
                if(data.length == 0){
                    alert('Match not found!');
                }else{
                    $.each(data,function(index){
                        alert("Match found!\nId: "+data[index].id+"\nAuthor: "+data[index].author+"\nTitle: "+data[index].title+"\nGenre: "+data[index].genre+"\nPrice: "+data[index].price);
                        //alert('Match found:\n'+JSON.stringify(data[index])); 
                    });
                }
            },
            error: function(err) {
                alert('Something went wrong!');
                console.log(err);
            }
        });
        e.preventDefault();
    });

});