"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);

  // esto sirve para iniciar sesion con google y auth
  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
      console.log(response);
      console.log(providers);
    };
    setUpProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3 ">
      <Link href="/" className="flex gap-2 flex-center" flex gap-2 flex-center>
        <Image
          src="/assets/images/logo.png"
          alt="Logo"
          width={40}
          height={40}
          className="object-contain"
        />
        <p className="logo_text">Q&A Estructuras</p>
      </Link>

      {/* desktop navigations */}
      <div className="sm:flex hidden">
        <Link href="/test" className="quiz_btn mr-5">
          Quiz
        </Link>

        {session?.user ? (
          <div className=" flex gap-3 md:gap-5">
            <Link
              href="/create-question"
              className="black_btn"
              onClick={() => setToggleDropDown(false)}>
              Crear pregunta
            </Link>
            <button type="buttn" onClick={signOut} className="outline_btn">
              {" "}
              Salir
            </button>

            <Link href="/profile">
              {" "}
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"></Image>
            </Link>
          </div>
        ) : (
          <>
            {" "}
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn">
                  Ingresar
                </button>
              ))}
          </>
        )}
      </div>

      {/* mobile */}

      <div className="sm:hidden flex relative">
        <Link href="/test" className="quiz_btn mr-5">
          Quiz
        </Link>
        {session?.user ? (
          <div className="flex">
            {" "}
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropDown((prev) => !prev)}></Image>
            {toggleDropDown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}>
                  Mi perfil
                </Link>

                <Link
                  href="/create-question"
                  className="dropdown_link"
                  onClick={() => setToggleDropDown(false)}>
                  Crear pregunta
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropDown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn">
                  Salir
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className="black_btn">
                  Ingresar
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
