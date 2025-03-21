import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createColmeia } from "../services/api";
import { useRouter } from "next/router";
import {
  Container,
  TextField,
  Button,
  Typography,
} from "@mui/material";

export default function NovaColmeia() {
  const router = useRouter();
  const [form, setForm] = useState({ nome: "", localizacao: "", temperatura: "", umidade: "" });
  
  const mutation = useMutation({
    mutationFn: createColmeia,
    onSuccess: () => {
      console.log("Colmeia criada com sucesso!");
      router.push("/");
    },
    onError: (error) => {
      console.error("Erro ao criar colmeia:", error);
    },
  });
  
  const handleSubmit = () => {
    // Convertendo os campos numéricos para Float antes de enviar
    const dadosProcessados = {
      nome: form.nome,
      localizacao: form.localizacao,
      temperatura: form.temperatura ? parseFloat(form.temperatura) : null,
      umidade: form.umidade ? parseFloat(form.umidade) : null
    };
    
    console.log("Dados processados:", dadosProcessados);
    mutation.mutate(dadosProcessados);
  };
  
  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom>Cadastrar Nova Colmeia</Typography>
      <TextField
        label="Nome"
        fullWidth
        margin="normal"
        value={form.nome}
        onChange={(e) => setForm({ ...form, nome: e.target.value })}
      />
      <TextField
        label="Localização"
        fullWidth
        margin="normal"
        value={form.localizacao}
        onChange={(e) => setForm({ ...form, localizacao: e.target.value })}
      />
      <TextField
        label="Temperatura"
        type="number"
        fullWidth
        margin="normal"
        value={form.temperatura}
        onChange={(e) => setForm({ ...form, temperatura: e.target.value })}
      />
      <TextField
        label="Umidade"
        type="number"
        fullWidth
        margin="normal"
        value={form.umidade}
        onChange={(e) => setForm({ ...form, umidade: e.target.value })}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
      >
        Cadastrar
      </Button>
    </Container>
  );
}
