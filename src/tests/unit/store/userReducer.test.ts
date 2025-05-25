import type { UserState } from "@/store/userReducer";
import reducer, { loginWithGoogle } from "@/store/userReducer";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/services/authService", () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      loginWithGoogle: vi.fn().mockResolvedValue({
        uid: "123",
        displayName: "Teste",
        email: "teste@teste.com",
        photoURL: "url",
      }),
    })),
  };
});

vi.mock("@/services/databaseService", () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      checkUserExists: vi.fn().mockResolvedValue(false),
      createUser: vi.fn().mockResolvedValue(true),
    })),
  };
});

describe("userReducer", () => {
  const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
  };

  it("Should set loading true when firing pending", () => {
    const action = { type: loginWithGoogle.pending.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      user: null,
      loading: true,
      error: null,
    });
  });

  it("Should set user and loading false when fulfilled", () => {
    const mockUser = {
      id: "123",
      name: "Teste",
      email: "teste@teste.com",
      photoURL: "url",
      favoriteRecipes: [],
      instagramLink: "",
    };

    const action = {
      type: loginWithGoogle.fulfilled.type,
      payload: mockUser,
    };

    const state = reducer(initialState, action);

    expect(state).toEqual({
      user: mockUser,
      loading: false,
      error: null,
    });
  });

  it("Should set error and loading false when rejected", () => {
    const action = {
      type: loginWithGoogle.rejected.type,
      payload: "Erro de autenticação",
    };

    const state = reducer(initialState, action);

    expect(state).toEqual({
      user: null,
      loading: false,
      error: "Erro de autenticação",
    });
  });
});
