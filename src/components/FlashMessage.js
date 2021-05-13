import React from 'react'

export const FlashMessage = (props) => {
    return (
        <div class={`alert alert-${props.category} alert-dismissible fade show`} role="alert">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                <span class="sr-only">Close</span>
            </button>
            <strong>{props.message}</strong>
        </div>
    )
}
