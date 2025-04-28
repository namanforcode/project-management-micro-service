import {  useState } from 'react';
import { useProjectStore } from '@/store/projectStore';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/header';

const ProjectPage = () => {
  const { projects, fetchProjects, createProject, deleteProject, isLoading } = useProjectStore();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleCreate = async () => {
    await createProject({ name, description });
    setName('');
    setDescription('');
  };

  return (
    <>
    <Header />
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>

    </div>
      </>
  );
};

export default ProjectPage;
