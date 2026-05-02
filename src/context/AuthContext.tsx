import React, { createContext, useContext, useState, useCallback } from 'react';
import { Utilisateur } from '../types';
import { mockUsers } from '../data/maladies';

interface AuthContextType {
  user: Utilisateur | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => { success: boolean; message: string };
  register: (nom: string, email: string, password: string) => { success: boolean; message: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Utilisateur | null>(null);
  const [users, setUsers] = useState<Utilisateur[]>(mockUsers);

  const login = useCallback((email: string, password: string) => {
    const found = users.find(u => u.email === email && u.motDePasse === password);
    if (found) {
      setUser(found);
      return { success: true, message: 'Connexion réussie!' };
    }
    return { success: false, message: 'Email ou mot de passe incorrect.' };
  }, [users]);

  const register = useCallback((nom: string, email: string, password: string) => {
    const exists = users.find(u => u.email === email);
    if (exists) {
      return { success: false, message: 'Cet email est déjà utilisé.' };
    }
    const newUser: Utilisateur = {
      id: users.length + 1,
      nom,
      email,
      motDePasse: password,
      role: 'agriculteur',
    };
    setUsers(prev => [...prev, newUser]);
    setUser(newUser);
    return { success: true, message: 'Inscription réussie!' };
  }, [users]);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
