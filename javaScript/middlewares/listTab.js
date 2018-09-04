module.exports = (request, response, next) => {    
    request.add = (content) => {
        if (request.session.list === undefined) {
            request.session.list = [];
        }
        if(request.body.toDo !== '') {
            request.session.list.push(content);
        }
        
        response.redirect('/');
    }
    
    request.del = (id) => {
        request.session.list.splice(id, 1);
        
        response.redirect('/');
    }
    
    next();
}