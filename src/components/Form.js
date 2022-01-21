function Form(props) {

    const handleLastLetter = (event) => {
        props.handleLastLetter(event.currentTarget.value);
    }

    return (
        <form className="form" onSubmit={props.handleSubmit}>  
            <label className="title" htmlFor="last-letter">
                Escribe una letra:
            </label>
            <input
                autoComplete="off"
                className="form__input"
                maxLength="1"
                type="text"
                name="last-letter"
                id="last-letter"
                value={props.lastLetter}
                onChange={handleLastLetter}
            />
        </form>
    )

}

export default Form;