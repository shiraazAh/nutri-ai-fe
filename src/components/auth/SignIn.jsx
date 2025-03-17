import { useState } from "react";
import { signIn } from "aws-amplify/auth";
import { useNavigate, Link } from "react-router-dom";
import { Form, Input, Button, Alert, Card, Typography } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useAuth } from "../context/AuthContext";

const { Title } = Typography;

function SignIn() {
  const [form] = Form.useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setSignedIn, setUserData, getUserDetails } = useAuth();

  const handleSignIn = async (values) => {
    setLoading(true);
    setError("");
    try {
      const { email, password } = values;

      // This will be replaced with actual AWS Cognito implementation
      const signInResponse = await signIn({
        username: email,
        password: password,
      });

      if (signInResponse.isSignedIn) {
        await getUserDetails();
        setSignedIn(true);
        navigate("/");
      }
    } catch (error) {
      let errorMessage = "An error occurred during sign in";

      // Handle specific error cases
      if (error.name === "UserNotConfirmedException") {
        errorMessage = "Please verify your email before signing in";
      } else if (error.name === "NotAuthorizedException") {
        errorMessage = "Incorrect email or password";
      } else if (error.name === "UserNotFoundException") {
        errorMessage = "No account found with this email";
      } else if (error.name === "LimitExceededException") {
        errorMessage = "Too many attempts. Please try again later";
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <Title level={2} className="text-center mb-8">
          Sign in to your account
        </Title>

        {error && (
          <Alert
            // message="Error"
            description={error}
            type="error"
            showIcon
            className="mb-6"
            closable
            onClose={() => setError("")}
          />
        )}

        <Form
          form={form}
          onFinish={handleSignIn}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Email address"
              size="large"
              autoComplete="email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              {
                min: 8,
                message: "Password must be at least 8 characters long",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              size="large"
              autoComplete="current-password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              className="bg-green-700 hover:bg-green-600 text-white"
              htmlType="submit"
              loading={loading}
              block
              size="large"
            >
              Sign in
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center mt-4">
          <Link to="/signup" className="text-green-700 hover:text-green-600">
            Don't have an account? Sign up
          </Link>
        </div>
      </Card>
    </div>
  );
}

export default SignIn;
