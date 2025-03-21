const awsmobile = {
    "aws_project_region": "eu-west-1",
    "aws_cognito_identity_pool_id": import.meta.env.VITE_COGNITO_POOL,
    "aws_cognito_region": "eu-west-1",
    "aws_user_pools_id": import.meta.env.VITE_USER_POOL,
    "aws_user_pools_web_client_id": import.meta.env.VITE_WEB_CLIENT,
    "oauth": {},
    "aws_cognito_username_attributes": [
        "EMAIL"
    ],
    "aws_cognito_social_providers": [],
    "aws_cognito_signup_attributes": [
        "EMAIL"
    ],
    "aws_cognito_mfa_configuration": "OFF",
    "aws_cognito_mfa_types": [
        "SMS"
    ],
    "aws_cognito_password_protection_settings": {
        "passwordPolicyMinLength": 8,
        "passwordPolicyCharacters": []
    },
    "aws_cognito_verification_mechanisms": [
        "EMAIL"
    ]
};


export default awsmobile;
