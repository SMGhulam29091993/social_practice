class PostComments{
    constructor(postId){
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        this.newCommentForm = $(`#post-${postId}-comments-form`);

        this.createComment(postId);

        let self = this;

        $(` .delete-comment-button`, this.postContainer).each(()=>{
            self.deleteComment($(this));
        })
    }
    createComment(postId){
        let pSelf = this;
        this.newCommentForm.submit((e)=>{
            e.preventDefault();
            let self = this;

            $.ajax({
                type : 'post',
                url : 'comment/commentCreate',
                success : (data)=>{
                    newCommentFormDOM(data.data.comment);
                    $(`#post-comment-${postId}`).prepend(newComment);
                    pSelf.deleteComment($(` .delete-comment-button`, newComment));

                    new Noty({
                        theme : 'relax',
                        text : 'Comment Published',
                        type :'success',
                        layout :'topCenter',
                        timeout : 1500
                    }).show()
                },
                error : (err)=>{
                    console.log(err.responseText);
                }
            })
        })
    }
    newCommentFormDOM(comment){
        return $(`<li id="comment-${comment._id}">
                        <p>
                           
                                <small>
                                    <a class="delete-comment-button" href="/comment/destroy/${comment.id}">X</a>
                                </small>
                    
                            <!-- <small>
                                <a href="/"></a>
                            </small> -->
                            ${comment.content}
                            <br>
                            <small>
                                ${comment.user.name}
                            </small>
                        </p>
                    </li>`)
    }

    deleteComment(deleteLink){
        $(deleteLink).click((e)=>{
            e.preventDefault();

            $.ajax({
                type : 'get',
                url : $(deleteLink).prop('href'),
                success : (data)=>{
                    $(`#comment-${data.data.comment_id}`).remove();

                    new Noty({
                        theme : 'relax',
                        text : 'Comment Deleted',
                        type : 'success',
                        layout : 'topCenter',
                        timeout : 1500
                    }).show();
                },
                error : (err)=>{
                    console.log(err.responseText);
                }
            })
        })
    }
}