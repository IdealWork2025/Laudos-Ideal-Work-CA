
// Protótipo gratuito: site com login e visualização segura de documentos (sem download direto)

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const mockUsers = {
  "usuario@example.com": "123456",
};

const documents = [
  {
    id: 1,
    title: "Documento 1",
    url: "https://example.com/docs/doc1.pdf", // Substituir pela URL real
  },
  {
    id: 2,
    title: "Documento 2",
    url: "https://example.com/docs/doc2.pdf",
  },
];

export default function VisualizacaoDocumentos() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [logado, setLogado] = useState(false);
  const [erro, setErro] = useState("");

  const handleLogin = () => {
    if (mockUsers[email] === senha) {
      setLogado(true);
    } else {
      setErro("Usuário ou senha inválidos");
    }
  };

  if (!logado) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center min-h-screen gap-4">
        <h1 className="text-2xl font-bold">Acesso Restrito</h1>
        <Input placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="Senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
        <Button onClick={handleLogin}>Entrar</Button>
        {erro && <p className="text-red-500">{erro}</p>}
      </motion.div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Documentos Disponíveis</h1>
      <div className="grid grid-cols-1 gap-4">
        {documents.map((doc) => (
          <Card key={doc.id}>
            <CardContent>
              <h2 className="font-semibold mb-2">{doc.title}</h2>
              <iframe
                src={doc.url + "#toolbar=0&navpanes=0&scrollbar=0"}
                width="100%"
                height="400px"
                sandbox="allow-scripts allow-same-origin"
                className="border rounded"
                onContextMenu={(e) => e.preventDefault()}
              ></iframe>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
