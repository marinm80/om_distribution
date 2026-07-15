import jwt from 'jsonwebtoken';
import authService from '../services/auth.service';
import userRepository from '../repositories/user.repository';

jest.mock('../repositories/user.repository', () => ({
  __esModule: true,
  default: {
    findRefreshToken: jest.fn(),
    findById: jest.fn(),
    rotateRefreshToken: jest.fn(),
    deleteRefreshToken: jest.fn(),
    saveRefreshToken: jest.fn(),
  },
}));

const mockedRepository = userRepository as jest.Mocked<typeof userRepository>;

describe('AuthService refresh-token rotation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.JWT_SECRET = 'test-access-secret';
    process.env.JWT_REFRESH_SECRET = 'test-refresh-secret';
  });

  it('invalidates the used refresh token and persists a replacement', async () => {
    const oldToken = jwt.sign({ id: 'user-1' }, process.env.JWT_REFRESH_SECRET!, { expiresIn: '7d' });
    mockedRepository.findRefreshToken.mockResolvedValue({
      user_id: 'user-1',
      token: oldToken,
      expires_at: new Date(Date.now() + 60_000),
    });
    mockedRepository.findById.mockResolvedValue({
      id: 'user-1' as unknown as number,
      name: 'Admin',
      email: 'admin@example.com',
      role: 'admin',
    });

    const result = await authService.refreshToken(oldToken);

    expect(result.accessToken).toEqual(expect.any(String));
    expect(result.refreshToken).toEqual(expect.any(String));
    expect(result.refreshToken).not.toBe(oldToken);
    expect(mockedRepository.rotateRefreshToken).toHaveBeenCalledWith(
      oldToken,
      'user-1',
      result.refreshToken,
      expect.any(Date)
    );
  });
});
