const urlHeroku = "https://murmuring-lowlands-78173.herokuapp.com/"

$(document).ready(
    $.ajax({
        method : 'get',
        url : urlHeroku,
        success : (data)=>{
            $('#hello-world').append(`${data}`)
        },
        error : (err)=>{
            console.log(err)
        }
    })
)