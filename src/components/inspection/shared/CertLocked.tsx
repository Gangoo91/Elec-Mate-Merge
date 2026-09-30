import React, { createContext, useContext } from 'react';

/**
 * Whether the certificate being rendered is locked (issued / QS-approved —
 * ELE-1037). The form shells already make a locked cert read-only for the
 * user; this lets shared sections that write DERIVED defaults from an effect
 * (Table 64 test voltage, canonical earthing spelling) stay silent too, rather
 * than marking a locked cert "unsaved" the moment it is opened.
 *
 * Absent provider = editable, so a section used outside the three shells
 * behaves exactly as before.
 */
const CertLockedContext = createContext(false);

export const CertLockedProvider: React.FC<{ locked: boolean; children: React.ReactNode }> = ({
  locked,
  children,
}) => <CertLockedContext.Provider value={locked}>{children}</CertLockedContext.Provider>;

export const useCertLocked = (): boolean => useContext(CertLockedContext);
