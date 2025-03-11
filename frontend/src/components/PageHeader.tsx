import { useCallback } from 'react';
import { Typography, Box, Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import '../styles/globals.css';

interface PageHeaderProps {
  title: string;
  backUrl?: string;
  actionButton?: {
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
  };
}

const PageHeader = ({ title, backUrl, actionButton }: PageHeaderProps) => {
  const navigate = useNavigate();

  const handleBack = useCallback(() => {
    if (backUrl) {
      navigate(backUrl);
    } else {
      navigate(-1);
    }
  }, [backUrl, navigate]);

  return (
    <Box className="section-header">
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {(backUrl || backUrl === '') && (
          <IconButton 
            onClick={handleBack} 
            size="small"
            sx={{ 
              marginRight: 'var(--spacing-sm)',
              color: 'var(--primary-color)',
              backgroundColor: 'var(--background)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              '&:hover': {
                backgroundColor: 'var(--primary-light)',
              }
            }}
          >
            <ArrowBackIcon fontSize="small" />
          </IconButton>
        )}
        <Typography variant="h4" component="h1" className="section-title">
          {title}
        </Typography>
      </Box>

      {actionButton && (
        <Button
          variant="contained"
          color="primary"
          startIcon={actionButton.icon}
          onClick={actionButton.onClick}
          sx={{
            height: '40px',
            fontWeight: 'var(--font-weight-semibold)',
            fontSize: 'var(--font-size-sm)',
          }}
        >
          {actionButton.label}
        </Button>
      )}
    </Box>
  );
};

export default PageHeader; 