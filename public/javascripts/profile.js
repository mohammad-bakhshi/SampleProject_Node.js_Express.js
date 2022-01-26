function deleteBlogger(id)
{
    fetch(`/${id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
    })
    .then(()=>window.location.href='/')
    .catch(function (error) {
        console.log(error);
    })
}