import { useEffect } from "react";
import { auth } from "../lib/firebase/firebase.config";
import { signInWithRedirect, getRedirectResult, GoogleAuthProvider } from "firebase/auth";

export default function Home() {
  useEffect(() => {
    const checkRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);

        if (result) {
          // Usuário logado com sucesso
          console.log("Usuário:", result.user);
          console.log("Token:", result._tokenResponse);
        } else {
          console.log("Nenhum resultado de login (normal se for primeira vez).");
        }
      } catch (error) {
        console.error("Erro ao obter resultado de redirect:", error);
      }
    };

    checkRedirectResult();
  }, []);
  
  const handleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Logar com Google</h1>
      <button onClick={handleLogin}>Logar</button>
    </div>
  );
}
