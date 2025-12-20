CREATE TABLE IF NOT EXISTS error_logs (
    id SERIAL PRIMARY KEY,
    message TEXT NOT NULL,
    stack_trace TEXT,
    context JSONB,
    severity VARCHAR(20) DEFAULT 'ERROR',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_error_logs_created_at ON error_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_error_logs_severity ON error_logs(severity);
