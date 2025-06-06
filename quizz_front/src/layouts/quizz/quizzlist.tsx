import React, { useState } from 'react';
import { useGetQuizzesQuery, useCreateQuizzMutation, useDeleteQuizzMutation, useUpdateQuizzMutation } from '../../features/quizzlogique/quizz';
import { type Quizz } from '../../features/quizzlogique/quizz';
import {
    Box, Card, CardContent, CardActions, Typography, TextField, Button, Stack, IconButton
} from '@mui/material';
import { Edit, Delete, Save, Cancel } from '@mui/icons-material';
import { toast } from 'react-toastify';

export default function QuizzList() {
    const { data: quizzes, isLoading, isError } = useGetQuizzesQuery();
    const [createQuizz] = useCreateQuizzMutation();
    const [updateQuizz] = useUpdateQuizzMutation();
    const [deleteQuizz] = useDeleteQuizzMutation();

    const [newTitle, setNewTitle] = useState('');
    const [editId, setEditId] = useState<number | null>(null);
    const [editTitle, setEditTitle] = useState('');

    if (isLoading) return <Typography>Loading quizzes...</Typography>;
    if (isError) return <Typography color="error">Error loading quizzes.</Typography>;

    const handleCreate = async () => {
        if (newTitle.trim() === '') return;
        try {
            await createQuizz({ title: newTitle }).unwrap()
            .then(()=>handleSuccessOperation("created with success"))
            .catch(()=>handleErrorOperation("There is error"));
            setNewTitle('');
        } catch (err) {
            console.error('Failed to create quiz:', err);
        }
    };

    const handleUpdate = async (id: number) => {
        if (editTitle.trim() === '') return;
        try {
            await updateQuizz({ id, quizz: { title: editTitle } }).unwrap()
            .then(()=>handleSuccessOperation("update with success"))
            .catch(()=>handleErrorOperation("There is error"));
            setEditId(null);
            setEditTitle('');
        } catch (err) {
            console.error('Failed to update quiz:', err);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteQuizz(id).unwrap()
            .then(()=>handleSuccessOperation("delete with success"))
            .catch(()=>handleErrorOperation("There is error"));
        } catch (err) {
            console.error('Failed to delete quiz:', err);
        }
    };
    function handleSuccessOperation(operation:string) {
      toast.success(operation, {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
    }
  
    function handleErrorOperation(operation:string) {
      toast.error(operation, {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
    }
    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>
                My Quizzes
            </Typography>

            <Stack direction="row" spacing={2} alignItems="center" mb={4}>
                <TextField
                    label="New quiz title"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    variant="outlined"
                    size="small"
                />
                <Button
                    onClick={handleCreate}
                    variant="contained"
                    color="primary"
                >
                    Create
                </Button>
            </Stack>

            <Stack spacing={2}>
                {quizzes?.map((quiz: Quizz) => (
                    <Card key={quiz.id} variant="outlined">
                        <CardContent>
                            {editId === quiz.id ? (
                                <TextField
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                />
                            ) : (
                                <Typography variant="h6">{quiz.title}</Typography>
                            )}
                        </CardContent>
                        <CardActions>
                            {editId === quiz.id ? (
                                <>
                                    <IconButton color="success" onClick={() => handleUpdate(quiz.id)}>
                                        <Save />
                                    </IconButton>
                                    <IconButton
                                        color="default"
                                        onClick={() => {
                                            setEditId(null);
                                            setEditTitle('');
                                        }}
                                    >
                                        <Cancel />
                                    </IconButton>
                                </>
                            ) : (
                                <>
                                    <IconButton
                                        color="primary"
                                        onClick={() => {
                                            setEditId(quiz.id);
                                            setEditTitle(quiz.title);
                                        }}
                                    >
                                        <Edit />
                                    </IconButton>
                                    <IconButton
                                        color="error"
                                        onClick={() => handleDelete(quiz.id)}
                                    >
                                        <Delete />
                                    </IconButton>
                                </>
                            )}
                        </CardActions>
                    </Card>
                ))}
            </Stack>
        </Box>
    );
}
