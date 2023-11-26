"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setMyPosts(data);
    };

    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  const handleEdit = (post) => {
    router.push(`/update-question?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    console.log("este es mi post ");
    console.log(post._id);
    console.log(`/api/question/${post._id.toString()}`);
    const hasConfirmed = confirm("Seguro que quieres eliminar esta pregunta?");
    console.log(hasConfirmed);
    if (hasConfirmed) {
      try {
        await fetch(`/api/question/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = myPosts.filter((item) => item._id !== post._id);

        setMyPosts(filteredPosts);
      } catch (error) {
        console.log("esto es un error del servidor");
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name="Mi"
      desc="¡Bienvenido a tu perfil personalizado! Aquí puedes gestionar las preguntas que has creado anteriormente."
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
