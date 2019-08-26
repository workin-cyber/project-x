// const res = {
//     person_id: person.person_id,
//     full_name: person.f_name + ' ' +person.l_name,
//     details: person.details,
//     status_person: person_statuses.status_id,
//     course_data: course_values
// }

const res = {
    person_id: 333,
    full_name: 'עומר' + ' ' + 'מזרחי',
    details: '',
    status_person: 1,
    course_data: {

    }
}
let id = 333

let person;

$(function () {
    let url = new URL(window.location.href);
    let id = url.searchParams.get("id");
    // return false;
    $.ajax({
        type: 'GET',
        url: 'http://localhost:1234/login/'+id,
        success: function (data) {
            person=JSON.parse(data)
            $(".welcome_text_area").html(person.course_data.welcome_text)
            $("#home").attr('style',`background-image: url(${person.course_data.welcome_img});`)
            // $(".section_heading text-center").html(person.details)
            $("#private_text").append(`<h3>${person.full_name}</h3> <p>${person.details}</p></br><p>${person.course_data.static_details}</p>`)
            $("#box1").html(person.course_data.box1)
            $("#box2").html(person.course_data.box2)
            $("#box3").html(person.course_data.box3)
            $("#box4").html(person.course_data.box4)
            $("#plane_course").html(person.course_data.course_plan)
        },
        error: function (e) {
            alert('An error has occurred');
            console.log(e)

        },
    });
});

// (function() {


//  })();