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
                    pSelf.deleteComment($(`  .delete-comment-button`, newComment));

                    // CHANGE :: enable the functionality of the toggle like button on the new comment
                    new ToggleLike($(' .toggle-like-button', newComment));

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
                            <small>
                            
                                <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${comment._id}&type=Comment">
                                    0 Likes
                                </a>
                            
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