// const res = {
//     person_id: person.person_id,
//     full_name: person.f_name + ' ' +person.l_name,
//     details: person.details,
//     status_person: person_statuses.status_id,
//     course_data: course_values
// }

let person;

$(function () {
    return false;
    let id = document.location.pathname.split('/leads/')[1]
    
    $.ajax({
        type: 'GET',
        url: '/login/' + id,
        success: function (data) {
            person = JSON.parse(data)
            $(".welcome_text_area").html(person.course_data.welcome_text)
            $("#home").attr('style', `background-image: url(${person.course_data.welcome_img});`)
            // $(".section_heading text-center").html(person.details)
            $("#private_text").append(`<h3>${person.full_name}</h3> <p>${person.details}</p></br><p>${person.course_data.static_details}</p>`)
            $("#box1").html(person.course_data.box1)
            $("#box2").html(person.course_data.box2)
            $("#box3").html(person.course_data.box3)
            $("#box4").html(person.course_data.box4)
            $("#plane_course").html(person.course_data.course_plan)
            $('#radio' + person.status_person).attr("checked", "checked")
        },
        error: function (e) {
            alert('An error has occurred');
            console.log(e)

        },
    });
},

$("form").submit(function(e){
    const status = document.querySelector('input[name="radio"]:checked');
    const id = document.location.pathname.split('/leads/')[1]
    if(!status || !id) return false;
    e.preventDefault();
    $.ajax({
        type: 'PUT',
        url: '/status/',
        data: { person_id: id, status_id: status.value },
        success: function (data) {
            $('.success-msg').empty().append(`<span>${data}</span>`).fadeIn(600);
            // window.setTimeout(function() {
            //     window.location.href = 'thankyou.html';
            // }, 3000);
        },
        error: function (e) {
            alert('קרתה שגיאה, אבל אל דאגה, ניצור איתך קשר בקרוב.');
            console.log(e)
        },
    });
})
);





// (function() {


//  })();