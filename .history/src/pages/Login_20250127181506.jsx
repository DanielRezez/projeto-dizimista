import '@/css/Login.css'

function Login() {
    return(
        <section>
            <div className="image-space">
                <div className="linha"></div>
                <img src="@/Logo.png" />
            </div>
            {/*image-space*/}
            <div className="texto">
                <h1>Portal do Dizimista</h1>
                <p>Descrição</p>
            </div>
        </section>
    );
}

export default Login;