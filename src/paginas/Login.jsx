import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerta from "../components/Alerta";
import useAuth from "../hooks/useAuth";
import clienteAxios from "../config/axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });

      return;
    }

    try {
      const { data } = await clienteAxios.post("/veterinarios/login", {
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      setAuth(data);
      navigate("/admin");
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;
  return (
    <>
      <div id='titulo' className='w-full h-96 bg-cover bg-no-repeat b-center '>
        <h1 className='text-lime-600 font-black text-6xl '>
          Inicia Sesión y Administra tus {""}
          <span className='text-orange-400'> Pacientes</span>
        </h1>
      </div>

      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl  bg-green-600'>
        {msg && <Alerta alerta={alerta} />}

        <form onSubmit={handleSubmit}>
          <div className='my-5 '>
            <label className='uppercase text-gray-200 block text-xl font-bold'>
              Email
            </label>
            <input
              type='email'
              placeholder='Email de Registro'
              className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='my-5'>
            <label className='uppercase text-gray-50 block text-xl font-bold'>
              Password
            </label>
            <input
              type='password'
              placeholder='Tu Password'
              className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <input
            type='submit'
            value='Iniciar Sesión'
            className='bg-orange-600 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-orange-700 md:w-auto '
          />
        </form>

        <nav className='mt-10 lg:flex lg:justify-between'>
          <Link className='block text-center my-5 text-gray-50' to='/registrar'>
            ¿No tienes una cuenta? Regístrate
          </Link>
          <Link
            className='block text-center my-5 text-gray-50'
            to='/olvide-password'
          >
            Olvide mi Password
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Login;
