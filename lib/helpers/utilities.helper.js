
exports.paginationControl=async(req)=>{
    pager={};


    var pageNumber=parseInt(req.query.pn);
    if(pageNumber){
        pager.pageNumber=pageNumber;
    }else{
        pager.pageNumber=1;
    }

    var pageSizeLimit=parseInt(req.query.limit);
    if(pageSizeLimit){
        pager.pageSizeLimit=pager.pageSizeLimit;
    }else{
        pager.pageSizeLimit=5;
    }
    return {
        pageNumber:pager.pageNumber,
        pageSizeLimit:pager.pageSizeLimit
    }
}

exports.errorMessageContol=(message)=>{
    messages=[];
    for (let index=0;index<message.length;index++){
        var element=message[index].msg;
        messages[index]=element;
    }
}