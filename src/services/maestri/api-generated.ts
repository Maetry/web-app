import { api } from './reducer';
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    postAuthApple: build.mutation<PostAuthAppleApiResponse, PostAuthAppleApiArg>({
      query: (queryArg) => ({
        url: `/v1/auth/apple`,
        method: 'POST',
        body: queryArg.authParametersAppleToken,
        headers: {
          'Idempotency-Key': queryArg['Idempotency-Key'],
        },
      }),
    }),
    postAuthGoogle: build.mutation<PostAuthGoogleApiResponse, PostAuthGoogleApiArg>({
      query: (queryArg) => ({
        url: `/v1/auth/google`,
        method: 'POST',
        body: queryArg.authParametersGoogleToken,
        headers: {
          'Idempotency-Key': queryArg['Idempotency-Key'],
        },
      }),
    }),
    postAuthLogout: build.mutation<PostAuthLogoutApiResponse, PostAuthLogoutApiArg>({
      query: (queryArg) => ({
        url: `/v1/auth/logout`,
        method: 'POST',
        headers: {
          'Idempotency-Key': queryArg['Idempotency-Key'],
        },
      }),
    }),
    postAuthRefresh: build.mutation<PostAuthRefreshApiResponse, PostAuthRefreshApiArg>({
      query: (queryArg) => ({
        url: `/v1/auth/refresh`,
        method: 'POST',
        body: queryArg.authParametersRefreshingToken,
        headers: {
          'Idempotency-Key': queryArg['Idempotency-Key'],
        },
      }),
    }),
    postMeBookings: build.mutation<PostMeBookingsApiResponse, PostMeBookingsApiArg>({
      query: (queryArg) => ({
        url: `/v1/me/bookings`,
        method: 'POST',
        body: queryArg.visitParametersCreateBooking,
      }),
    }),
    getMeVisits: build.query<GetMeVisitsApiResponse, GetMeVisitsApiArg>({
      query: (queryArg) => ({
        url: `/v1/me/visits`,
        params: {
          state: queryArg.state,
        },
      }),
    }),
    getMeVisitsById: build.query<GetMeVisitsByIdApiResponse, GetMeVisitsByIdApiArg>({
      query: (queryArg) => ({ url: `/v1/me/visits/${queryArg.id}` }),
    }),
    postMeVisitsByIdCancel: build.mutation<
      PostMeVisitsByIdCancelApiResponse,
      PostMeVisitsByIdCancelApiArg
    >({
      query: (queryArg) => ({ url: `/v1/me/visits/${queryArg.id}/cancel`, method: 'POST' }),
    }),
    postMeVisitsByIdConfirm: build.mutation<
      PostMeVisitsByIdConfirmApiResponse,
      PostMeVisitsByIdConfirmApiArg
    >({
      query: (queryArg) => ({ url: `/v1/me/visits/${queryArg.id}/confirm`, method: 'POST' }),
    }),
    postMeVisitsByIdEditServices: build.mutation<
      PostMeVisitsByIdEditServicesApiResponse,
      PostMeVisitsByIdEditServicesApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/me/visits/${queryArg.id}/edit-services`,
        method: 'POST',
        body: queryArg.visitParametersEditServices,
      }),
    }),
    postMeVisitsByIdEditClientNote: build.mutation<
      PostMeVisitsByIdEditClientNoteApiResponse,
      PostMeVisitsByIdEditClientNoteApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/me/visits/${queryArg.id}/edit-client-note`,
        method: 'POST',
        body: queryArg.visitParametersEditClientNote,
      }),
    }),
    postMeVisitsByIdReschedule: build.mutation<
      PostMeVisitsByIdRescheduleApiResponse,
      PostMeVisitsByIdRescheduleApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/me/visits/${queryArg.id}/reschedule`,
        method: 'POST',
        body: queryArg.visitParametersReschedule,
      }),
    }),
    postClicksBylinkIdBy: build.mutation<
      PostClicksBylinkIdByApiResponse,
      PostClicksBylinkIdByApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/clicks/${queryArg.linkId}`,
        method: 'POST',
        body: queryArg.clickParametersMagicLink,
      }),
    }),
    postClicksFind: build.mutation<PostClicksFindApiResponse, PostClicksFindApiArg>({
      query: (queryArg) => ({
        url: `/v1/clicks/find`,
        method: 'POST',
        body: queryArg.clickParametersMagicLink,
      }),
    }),
    postClicksFindBylinkIdBy: build.mutation<
      PostClicksFindBylinkIdByApiResponse,
      PostClicksFindBylinkIdByApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/clicks/find/${queryArg.linkId}`,
        method: 'POST',
        body: queryArg.clickParametersMagicLink,
      }),
    }),
    getClientModelProfile: build.query<
      GetClientModelProfileApiResponse,
      GetClientModelProfileApiArg
    >({
      query: () => ({ url: `/v1/client/model-profile` }),
    }),
    postClientModelProfile: build.mutation<
      PostClientModelProfileApiResponse,
      PostClientModelProfileApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/client/model-profile`,
        method: 'POST',
        body: queryArg.modelProfileParametersCreate,
      }),
    }),
    putClientModelProfile: build.mutation<
      PutClientModelProfileApiResponse,
      PutClientModelProfileApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/client/model-profile`,
        method: 'PUT',
        body: queryArg.modelProfileParametersUpdate,
      }),
    }),
    getCustomerContacts: build.query<GetCustomerContactsApiResponse, GetCustomerContactsApiArg>({
      query: () => ({ url: `/v1/customer/contacts` }),
    }),
    postCustomerContacts: build.mutation<
      PostCustomerContactsApiResponse,
      PostCustomerContactsApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/customer/contacts`,
        method: 'POST',
        body: queryArg.contactParametersCreateCommunication,
      }),
    }),
    patchCustomerContactByContactId: build.mutation<
      PatchCustomerContactByContactIdApiResponse,
      PatchCustomerContactByContactIdApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/customer/contacts/${queryArg.contactId}`,
        method: 'PATCH',
        body: queryArg.contactParametersPatchCommunication,
      }),
    }),
    deleteCustomerContactByContactId: build.mutation<
      DeleteCustomerContactByContactIdApiResponse,
      DeleteCustomerContactByContactIdApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/customer/contacts/${queryArg.contactId}`,
        method: 'DELETE',
      }),
    }),
    postDevices: build.mutation<PostDevicesApiResponse, PostDevicesApiArg>({
      query: (queryArg) => ({
        url: `/v1/devices`,
        method: 'POST',
        body: queryArg.deviceParametersSystem,
      }),
    }),
    getFavorites: build.query<GetFavoritesApiResponse, GetFavoritesApiArg>({
      query: () => ({ url: `/v1/favorites` }),
    }),
    putFavoritesByIdAdd: build.mutation<PutFavoritesByIdAddApiResponse, PutFavoritesByIdAddApiArg>({
      query: (queryArg) => ({ url: `/v1/favorites/${queryArg.id}/add`, method: 'PUT' }),
    }),
    putFavoritesByIdRemove: build.mutation<
      PutFavoritesByIdRemoveApiResponse,
      PutFavoritesByIdRemoveApiArg
    >({
      query: (queryArg) => ({ url: `/v1/favorites/${queryArg.id}/remove`, method: 'PUT' }),
    }),
    getInvitesClientBylinkIdByContacts: build.query<
      GetInvitesClientBylinkIdByContactsApiResponse,
      GetInvitesClientBylinkIdByContactsApiArg
    >({
      query: (queryArg) => ({ url: `/v1/invites/client/${queryArg.linkId}/contacts` }),
    }),
    postInvitesClientBylinkIdByMerge: build.mutation<
      PostInvitesClientBylinkIdByMergeApiResponse,
      PostInvitesClientBylinkIdByMergeApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/invites/client/${queryArg.linkId}/merge`,
        method: 'POST',
        body: queryArg.inviteClientParametersMerge,
      }),
    }),
    putInvitesEmployeeBylinkIdBy: build.mutation<
      PutInvitesEmployeeBylinkIdByApiResponse,
      PutInvitesEmployeeBylinkIdByApiArg
    >({
      query: (queryArg) => ({ url: `/v1/invites/employee/${queryArg.linkId}`, method: 'PUT' }),
    }),
    putInvitesSalonBylinkIdBy: build.mutation<
      PutInvitesSalonBylinkIdByApiResponse,
      PutInvitesSalonBylinkIdByApiArg
    >({
      query: (queryArg) => ({ url: `/v1/invites/salon/${queryArg.linkId}`, method: 'PUT' }),
    }),
    getAcquisitionLeadSources: build.query<
      GetAcquisitionLeadSourcesApiResponse,
      GetAcquisitionLeadSourcesApiArg
    >({
      query: () => ({ url: `/v1/acquisition/lead-sources` }),
    }),
    postAcquisitionLeadSources: build.mutation<
      PostAcquisitionLeadSourcesApiResponse,
      PostAcquisitionLeadSourcesApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/acquisition/lead-sources`,
        method: 'POST',
        body: queryArg.leadSourceParametersCreate,
      }),
    }),
    getAcquisitionLeadSourcesByidBy: build.query<
      GetAcquisitionLeadSourcesByidByApiResponse,
      GetAcquisitionLeadSourcesByidByApiArg
    >({
      query: (queryArg) => ({ url: `/v1/acquisition/lead-sources/${queryArg.id}` }),
    }),
    putAcquisitionLeadSourcesByidBy: build.mutation<
      PutAcquisitionLeadSourcesByidByApiResponse,
      PutAcquisitionLeadSourcesByidByApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/acquisition/lead-sources/${queryArg.id}`,
        method: 'PUT',
        body: queryArg.leadSourceParametersUpdate,
      }),
    }),
    deleteAcquisitionLeadSourcesByidBy: build.mutation<
      DeleteAcquisitionLeadSourcesByidByApiResponse,
      DeleteAcquisitionLeadSourcesByidByApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/acquisition/lead-sources/${queryArg.id}`,
        method: 'DELETE',
      }),
    }),
    getAcquisitionLeadSourcesByidByStats: build.query<
      GetAcquisitionLeadSourcesByidByStatsApiResponse,
      GetAcquisitionLeadSourcesByidByStatsApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/acquisition/lead-sources/${queryArg.id}/stats`,
        params: {
          start: queryArg.start,
          end: queryArg.end,
        },
      }),
    }),
    getAcquisitionStats: build.query<GetAcquisitionStatsApiResponse, GetAcquisitionStatsApiArg>({
      query: (queryArg) => ({
        url: `/v1/acquisition/stats`,
        params: {
          start: queryArg.start,
          end: queryArg.end,
        },
      }),
    }),
    getAcquisitionLeadSourcesByidByCampaign: build.query<
      GetAcquisitionLeadSourcesByidByCampaignApiResponse,
      GetAcquisitionLeadSourcesByidByCampaignApiArg
    >({
      query: (queryArg) => ({ url: `/v1/acquisition/lead-sources/${queryArg.id}/campaign` }),
    }),
    putAcquisitionLeadSourcesByidByCampaign: build.mutation<
      PutAcquisitionLeadSourcesByidByCampaignApiResponse,
      PutAcquisitionLeadSourcesByidByCampaignApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/acquisition/lead-sources/${queryArg.id}/campaign`,
        method: 'PUT',
        body: queryArg.leadSourceCampaignParametersUpdate,
      }),
    }),
    postAcquisitionLeadSourcesByidByCampaignByEventManagerByManual: build.mutation<
      PostAcquisitionLeadSourcesByidByCampaignByEventManagerByManualApiResponse,
      PostAcquisitionLeadSourcesByidByCampaignByEventManagerByManualApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/acquisition/lead-sources/${queryArg.id}/campaign/event-manager/manual`,
        method: 'POST',
        body: queryArg.manualEventManagerConnectParameters,
      }),
    }),
    getAcquisitionLeadSourcesByidByPromoter: build.query<
      GetAcquisitionLeadSourcesByidByPromoterApiResponse,
      GetAcquisitionLeadSourcesByidByPromoterApiArg
    >({
      query: (queryArg) => ({ url: `/v1/acquisition/lead-sources/${queryArg.id}/promoter` }),
    }),
    putAcquisitionLeadSourcesByidByPromoter: build.mutation<
      PutAcquisitionLeadSourcesByidByPromoterApiResponse,
      PutAcquisitionLeadSourcesByidByPromoterApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/acquisition/lead-sources/${queryArg.id}/promoter`,
        method: 'PUT',
        body: queryArg.promoterParametersUpdate,
      }),
    }),
    getNotifications: build.query<GetNotificationsApiResponse, GetNotificationsApiArg>({
      query: () => ({ url: `/v1/notifications` }),
    }),
    putNotificationsReaded: build.mutation<
      PutNotificationsReadedApiResponse,
      PutNotificationsReadedApiArg
    >({
      query: () => ({ url: `/v1/notifications/readed`, method: 'PUT' }),
    }),
    putNotificationsReadedById: build.mutation<
      PutNotificationsReadedByIdApiResponse,
      PutNotificationsReadedByIdApiArg
    >({
      query: (queryArg) => ({ url: `/v1/notifications/readed/${queryArg.id}`, method: 'PUT' }),
    }),
    getBillingRedirect: build.query<GetBillingRedirectApiResponse, GetBillingRedirectApiArg>({
      query: (queryArg) => ({
        url: `/v1/billing/redirect`,
        params: {
          parameters: queryArg.parameters,
        },
      }),
    }),
    postBillingSessionResolve: build.mutation<
      PostBillingSessionResolveApiResponse,
      PostBillingSessionResolveApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/billing/session/resolve`,
        method: 'POST',
        body: queryArg.billingSessionResolveRequest,
      }),
    }),
    getPublicVisitByBookingId: build.query<
      GetPublicVisitByBookingIdApiResponse,
      GetPublicVisitByBookingIdApiArg
    >({
      query: (queryArg) => ({ url: `/v1/public/booking/visits/${queryArg.id}` }),
    }),
    postPublicBookingBySalonId: build.mutation<
      PostPublicBookingBySalonIdApiResponse,
      PostPublicBookingBySalonIdApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/public/booking/salon/${queryArg.salonId}`,
        method: 'POST',
        body: queryArg.publicBookingParametersCreate,
      }),
    }),
    getPublicBookingSalonCatalog: build.query<
      GetPublicBookingSalonCatalogApiResponse,
      GetPublicBookingSalonCatalogApiArg
    >({
      query: (queryArg) => ({ url: `/v1/public/booking/salon/${queryArg.salonId}/catalog` }),
    }),
    getPublicBookingSalonMasters: build.query<
      GetPublicBookingSalonMastersApiResponse,
      GetPublicBookingSalonMastersApiArg
    >({
      query: (queryArg) => ({ url: `/v1/public/booking/salon/${queryArg.salonId}/masters` }),
    }),
    getPublicBookingSalonProfile: build.query<
      GetPublicBookingSalonProfileApiResponse,
      GetPublicBookingSalonProfileApiArg
    >({
      query: (queryArg) => ({ url: `/v1/public/booking/salon/${queryArg.salonId}/profile` }),
    }),
    getSalonBysalonIdByCatalog: build.query<
      GetSalonBysalonIdByCatalogApiResponse,
      GetSalonBysalonIdByCatalogApiArg
    >({
      query: (queryArg) => ({ url: `/v1/salon/${queryArg.salonId}/catalog` }),
    }),
    getSalonBysalonIdByMasters: build.query<
      GetSalonBysalonIdByMastersApiResponse,
      GetSalonBysalonIdByMastersApiArg
    >({
      query: (queryArg) => ({ url: `/v1/salon/${queryArg.salonId}/masters` }),
    }),
    getSalonBysalonIdByProfile: build.query<
      GetSalonBysalonIdByProfileApiResponse,
      GetSalonBysalonIdByProfileApiArg
    >({
      query: (queryArg) => ({ url: `/v1/salon/${queryArg.salonId}/profile` }),
    }),
    getSearch: build.query<GetSearchApiResponse, GetSearchApiArg>({
      query: (queryArg) => ({
        url: `/v1/search`,
        params: {
          parameters: queryArg.parameters,
        },
      }),
    }),
    postWorkspaceBillingPortalSession: build.mutation<
      PostWorkspaceBillingPortalSessionApiResponse,
      PostWorkspaceBillingPortalSessionApiArg
    >({
      query: () => ({ url: `/v1/workspace/billing/portal-session`, method: 'POST' }),
    }),
    getWorkspaceBillingCatalog: build.query<
      GetWorkspaceBillingCatalogApiResponse,
      GetWorkspaceBillingCatalogApiArg
    >({
      query: () => ({ url: `/v1/workspace/billing/catalog` }),
    }),
    postWorkspaceBillingSession: build.mutation<
      PostWorkspaceBillingSessionApiResponse,
      PostWorkspaceBillingSessionApiArg
    >({
      query: () => ({ url: `/v1/workspace/billing/session`, method: 'POST' }),
    }),
    postWorkspaceBillingCheckoutSession: build.mutation<
      PostWorkspaceBillingCheckoutSessionApiResponse,
      PostWorkspaceBillingCheckoutSessionApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/workspace/billing/checkout-session`,
        method: 'POST',
        body: queryArg.billingCheckoutSessionRequest,
        headers: {
          'Idempotency-Key': queryArg['Idempotency-Key'],
        },
      }),
    }),
    postWorkspaceBillingChangePlan: build.mutation<
      PostWorkspaceBillingChangePlanApiResponse,
      PostWorkspaceBillingChangePlanApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/workspace/billing/change-plan`,
        method: 'POST',
        body: queryArg.billingPlanChangeRequest,
        headers: {
          'Idempotency-Key': queryArg['Idempotency-Key'],
        },
      }),
    }),
    postWorkspaceBillingCancel: build.mutation<
      PostWorkspaceBillingCancelApiResponse,
      PostWorkspaceBillingCancelApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/workspace/billing/cancel`,
        method: 'POST',
        body: queryArg.billingSubscriptionCancelRequest,
        headers: {
          'Idempotency-Key': queryArg['Idempotency-Key'],
        },
      }),
    }),
    getWorkspaceBillingSummary: build.query<
      GetWorkspaceBillingSummaryApiResponse,
      GetWorkspaceBillingSummaryApiArg
    >({
      query: () => ({ url: `/v1/workspace/billing/summary` }),
    }),
    postWorkspaceConnectOnboardingLink: build.mutation<
      PostWorkspaceConnectOnboardingLinkApiResponse,
      PostWorkspaceConnectOnboardingLinkApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/workspace/connect/onboarding-link`,
        method: 'POST',
        headers: {
          'Idempotency-Key': queryArg['Idempotency-Key'],
        },
      }),
    }),
    getWorkspaceConnectStatus: build.query<
      GetWorkspaceConnectStatusApiResponse,
      GetWorkspaceConnectStatusApiArg
    >({
      query: () => ({ url: `/v1/workspace/connect/status` }),
    }),
    postTimetablesByOwnerByForce: build.mutation<
      PostTimetablesByOwnerByForceApiResponse,
      PostTimetablesByOwnerByForceApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/timetables/${queryArg.owner}/${queryArg.force}`,
        method: 'POST',
        body: queryArg.timetableParametersCreatePattern,
      }),
    }),
    getTimetablesSchedules: build.query<
      GetTimetablesSchedulesApiResponse,
      GetTimetablesSchedulesApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/timetables/schedules`,
        params: {
          parameters: queryArg.parameters,
        },
      }),
    }),
    postTimetablesSearchSlots: build.mutation<
      PostTimetablesSearchSlotsApiResponse,
      PostTimetablesSearchSlotsApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/timetables/search-slots`,
        method: 'POST',
        body: queryArg.body,
        params: {
          query: queryArg.query,
        },
      }),
    }),
    postUploadThumb: build.mutation<PostUploadThumbApiResponse, PostUploadThumbApiArg>({
      query: (queryArg) => ({
        url: `/v1/upload/thumb`,
        method: 'POST',
        body: queryArg.uploadParametersThumb,
        headers: {
          'Idempotency-Key': queryArg['Idempotency-Key'],
        },
      }),
    }),
    deleteUsers: build.mutation<DeleteUsersApiResponse, DeleteUsersApiArg>({
      query: () => ({ url: `/v1/users`, method: 'DELETE' }),
    }),
    getUsers: build.query<GetUsersApiResponse, GetUsersApiArg>({
      query: () => ({ url: `/v1/users` }),
    }),
    putUsers: build.mutation<PutUsersApiResponse, PutUsersApiArg>({
      query: (queryArg) => ({
        url: `/v1/users`,
        method: 'PUT',
        body: queryArg.userParametersPatch,
      }),
    }),
    getUserRecoveryMethods: build.query<
      GetUserRecoveryMethodsApiResponse,
      GetUserRecoveryMethodsApiArg
    >({
      query: () => ({ url: `/v1/users/me/recovery-contacts` }),
    }),
    postUserRecoveryMethods: build.mutation<
      PostUserRecoveryMethodsApiResponse,
      PostUserRecoveryMethodsApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/users/me/recovery-contacts`,
        method: 'POST',
        body: queryArg.recoveryParametersCreateMethod,
      }),
    }),
    patchUserRecoveryMethodByRecoveryMethodId: build.mutation<
      PatchUserRecoveryMethodByRecoveryMethodIdApiResponse,
      PatchUserRecoveryMethodByRecoveryMethodIdApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/users/me/recovery-contacts/${queryArg.recoveryMethodId}`,
        method: 'PATCH',
        body: queryArg.recoveryParametersPatchMethod,
      }),
    }),
    deleteUserRecoveryMethodByRecoveryMethodId: build.mutation<
      DeleteUserRecoveryMethodByRecoveryMethodIdApiResponse,
      DeleteUserRecoveryMethodByRecoveryMethodIdApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/users/me/recovery-contacts/${queryArg.recoveryMethodId}`,
        method: 'DELETE',
      }),
    }),
    postUsersCustomer: build.mutation<PostUsersCustomerApiResponse, PostUsersCustomerApiArg>({
      query: (queryArg) => ({
        url: `/v1/users/customer`,
        method: 'POST',
        body: queryArg.customerParametersRegistration,
      }),
    }),
    downloadAppleWalletBookingPass: build.query<
      DownloadAppleWalletBookingPassApiResponse,
      DownloadAppleWalletBookingPassApiArg
    >({
      query: (queryArg) => ({ url: `/v1/wallet/apple/booking/${queryArg.id}` }),
    }),
    getWalletGoogleBookingByidBy: build.query<
      GetWalletGoogleBookingByidByApiResponse,
      GetWalletGoogleBookingByidByApiArg
    >({
      query: (queryArg) => ({ url: `/v1/wallet/google/booking/${queryArg.id}` }),
    }),
    deleteWorkspace: build.mutation<DeleteWorkspaceApiResponse, DeleteWorkspaceApiArg>({
      query: () => ({ url: `/v1/workspace`, method: 'DELETE' }),
    }),
    getWorkspace: build.query<GetWorkspaceApiResponse, GetWorkspaceApiArg>({
      query: () => ({ url: `/v1/workspace` }),
    }),
    postWorkspace: build.mutation<PostWorkspaceApiResponse, PostWorkspaceApiArg>({
      query: (queryArg) => ({
        url: `/v1/workspace`,
        method: 'POST',
        body: queryArg.workspaceParametersCreate,
      }),
    }),
    putWorkspace: build.mutation<PutWorkspaceApiResponse, PutWorkspaceApiArg>({
      query: (queryArg) => ({
        url: `/v1/workspace`,
        method: 'PUT',
        body: queryArg.workspaceParametersPatch,
      }),
    }),
    getWorkspaceById: build.query<GetWorkspaceByIdApiResponse, GetWorkspaceByIdApiArg>({
      query: (queryArg) => ({ url: `/v1/workspace/${queryArg.id}` }),
    }),
    putWorkspaceActivate: build.mutation<
      PutWorkspaceActivateApiResponse,
      PutWorkspaceActivateApiArg
    >({
      query: () => ({ url: `/v1/workspace/activate`, method: 'PUT' }),
    }),
    postWorkspaceAppointmentStart: build.mutation<
      PostWorkspaceAppointmentStartApiResponse,
      PostWorkspaceAppointmentStartApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/workspace/appointments/${queryArg.appointmentId}/start`,
        method: 'POST',
        body: queryArg.workspaceAppointmentParametersStart,
      }),
    }),
    postWorkspaceAppointmentComplete: build.mutation<
      PostWorkspaceAppointmentCompleteApiResponse,
      PostWorkspaceAppointmentCompleteApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/workspace/appointments/${queryArg.appointmentId}/complete`,
        method: 'POST',
        body: queryArg.workspaceAppointmentParametersComplete,
      }),
    }),
    postWorkspaceAppointmentNoShow: build.mutation<
      PostWorkspaceAppointmentNoShowApiResponse,
      PostWorkspaceAppointmentNoShowApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/workspace/appointments/${queryArg.appointmentId}/no-show`,
        method: 'POST',
        body: queryArg.workspaceAppointmentParametersNoShow,
      }),
    }),
    getWorkspaceBookings: build.query<GetWorkspaceBookingsApiResponse, GetWorkspaceBookingsApiArg>({
      query: (queryArg) => ({
        url: `/v1/workspace/bookings`,
        params: {
          state: queryArg.state,
        },
      }),
    }),
    postWorkspaceBookings: build.mutation<
      PostWorkspaceBookingsApiResponse,
      PostWorkspaceBookingsApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/workspace/bookings`,
        method: 'POST',
        body: queryArg.workspaceBookingParametersCreate,
        headers: {
          'Idempotency-Key': queryArg['Idempotency-Key'],
        },
      }),
    }),
    getWorkspaceBookingById: build.query<
      GetWorkspaceBookingByIdApiResponse,
      GetWorkspaceBookingByIdApiArg
    >({
      query: (queryArg) => ({ url: `/v1/workspace/bookings/${queryArg.bookingId}` }),
    }),
    postWorkspaceBookingApprove: build.mutation<
      PostWorkspaceBookingApproveApiResponse,
      PostWorkspaceBookingApproveApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/workspace/bookings/${queryArg.bookingId}/approve`,
        method: 'POST',
        headers: {
          'If-Match': queryArg['If-Match'],
        },
      }),
    }),
    postWorkspaceBookingReject: build.mutation<
      PostWorkspaceBookingRejectApiResponse,
      PostWorkspaceBookingRejectApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/workspace/bookings/${queryArg.bookingId}/reject`,
        method: 'POST',
        headers: {
          'If-Match': queryArg['If-Match'],
        },
      }),
    }),
    postWorkspaceBookingCancel: build.mutation<
      PostWorkspaceBookingCancelApiResponse,
      PostWorkspaceBookingCancelApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/workspace/bookings/${queryArg.bookingId}/cancel`,
        method: 'POST',
        headers: {
          'If-Match': queryArg['If-Match'],
        },
      }),
    }),
    postWorkspaceBookingReschedule: build.mutation<
      PostWorkspaceBookingRescheduleApiResponse,
      PostWorkspaceBookingRescheduleApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/workspace/bookings/${queryArg.bookingId}/reschedule`,
        method: 'POST',
        body: queryArg.workspaceBookingParametersReschedule,
        headers: {
          'If-Match': queryArg['If-Match'],
        },
      }),
    }),
    postWorkspaceBookingEditServices: build.mutation<
      PostWorkspaceBookingEditServicesApiResponse,
      PostWorkspaceBookingEditServicesApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/workspace/bookings/${queryArg.bookingId}/edit-services`,
        method: 'POST',
        body: queryArg.workspaceBookingParametersEditServices,
        headers: {
          'If-Match': queryArg['If-Match'],
        },
      }),
    }),
    postWorkspaceBookingAddStaffNode: build.mutation<
      PostWorkspaceBookingAddStaffNodeApiResponse,
      PostWorkspaceBookingAddStaffNodeApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/workspace/bookings/${queryArg.bookingId}/add-staff-node`,
        method: 'POST',
        body: queryArg.workspaceBookingParametersAddStaffNode,
        headers: {
          'If-Match': queryArg['If-Match'],
        },
      }),
    }),
    getWorkspaceClients: build.query<GetWorkspaceClientsApiResponse, GetWorkspaceClientsApiArg>({
      query: (queryArg) => ({
        url: `/v1/workspace/clients`,
        params: {
          parameters: queryArg.parameters,
        },
      }),
    }),
    postWorkspaceClients: build.mutation<
      PostWorkspaceClientsApiResponse,
      PostWorkspaceClientsApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/workspace/clients`,
        method: 'POST',
        body: queryArg.clientParametersCreate,
      }),
    }),
    getWorkspaceClientsById: build.query<
      GetWorkspaceClientsByIdApiResponse,
      GetWorkspaceClientsByIdApiArg
    >({
      query: (queryArg) => ({ url: `/v1/workspace/clients/${queryArg.id}` }),
    }),
    putWorkspaceClientsById: build.mutation<
      PutWorkspaceClientsByIdApiResponse,
      PutWorkspaceClientsByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/workspace/clients/${queryArg.id}`,
        method: 'PUT',
        body: queryArg.clientParametersPatch,
      }),
    }),
    getWorkspaceClientContacts: build.query<
      GetWorkspaceClientContactsApiResponse,
      GetWorkspaceClientContactsApiArg
    >({
      query: (queryArg) => ({ url: `/v1/workspace/clients/${queryArg.clientId}/contacts` }),
    }),
    postWorkspaceClientContacts: build.mutation<
      PostWorkspaceClientContactsApiResponse,
      PostWorkspaceClientContactsApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/workspace/clients/${queryArg.clientId}/contacts`,
        method: 'POST',
        body: queryArg.contactParametersCreateCommunication,
      }),
    }),
    patchWorkspaceClientContactByContactId: build.mutation<
      PatchWorkspaceClientContactByContactIdApiResponse,
      PatchWorkspaceClientContactByContactIdApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/workspace/clients/${queryArg.clientId}/contacts/${queryArg.contactId}`,
        method: 'PATCH',
        body: queryArg.contactParametersPatchCommunication,
      }),
    }),
    deleteWorkspaceClientContactByContactId: build.mutation<
      DeleteWorkspaceClientContactByContactIdApiResponse,
      DeleteWorkspaceClientContactByContactIdApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/workspace/clients/${queryArg.clientId}/contacts/${queryArg.contactId}`,
        method: 'DELETE',
      }),
    }),
    getWorkspaceClientsByIdByLinkCandidates: build.query<
      GetWorkspaceClientsByIdByLinkCandidatesApiResponse,
      GetWorkspaceClientsByIdByLinkCandidatesApiArg
    >({
      query: (queryArg) => ({ url: `/v1/workspace/clients/${queryArg.id}/link-candidates` }),
    }),
    postWorkspaceClientsByIdByLinks: build.mutation<
      PostWorkspaceClientsByIdByLinksApiResponse,
      PostWorkspaceClientsByIdByLinksApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/workspace/clients/${queryArg.id}/links`,
        method: 'POST',
        body: queryArg.clientParametersCreateLink,
      }),
    }),
    getWorkspaceComplex: build.query<GetWorkspaceComplexApiResponse, GetWorkspaceComplexApiArg>({
      query: (queryArg) => ({
        url: `/v1/workspace/complex`,
        params: {
          parameters: queryArg.parameters,
        },
      }),
    }),
    postWorkspaceComplex: build.mutation<
      PostWorkspaceComplexApiResponse,
      PostWorkspaceComplexApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/workspace/complex`,
        method: 'POST',
        body: queryArg.complexParametersCreate,
      }),
    }),
    deleteWorkspaceComplexById: build.mutation<
      DeleteWorkspaceComplexByIdApiResponse,
      DeleteWorkspaceComplexByIdApiArg
    >({
      query: (queryArg) => ({ url: `/v1/workspace/complex/${queryArg.id}`, method: 'DELETE' }),
    }),
    getWorkspaceComplexById: build.query<
      GetWorkspaceComplexByIdApiResponse,
      GetWorkspaceComplexByIdApiArg
    >({
      query: (queryArg) => ({ url: `/v1/workspace/complex/${queryArg.id}` }),
    }),
    putWorkspaceComplexById: build.mutation<
      PutWorkspaceComplexByIdApiResponse,
      PutWorkspaceComplexByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/workspace/complex/${queryArg.id}`,
        method: 'PUT',
        body: queryArg.complexParametersUpdate,
      }),
    }),
    postWorkspaceImportedSalonsPreview: build.mutation<
      PostWorkspaceImportedSalonsPreviewApiResponse,
      PostWorkspaceImportedSalonsPreviewApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/workspace/imported-salons/preview`,
        method: 'POST',
        body: queryArg.importedSalonPreviewRequest,
      }),
    }),
    postWorkspaceImportedSalonsCommit: build.mutation<
      PostWorkspaceImportedSalonsCommitApiResponse,
      PostWorkspaceImportedSalonsCommitApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/workspace/imported-salons/commit`,
        method: 'POST',
        body: queryArg.importedSalonCommitRequest,
      }),
    }),
    postWorkspaceImportedSalonsClaimLink: build.mutation<
      PostWorkspaceImportedSalonsClaimLinkApiResponse,
      PostWorkspaceImportedSalonsClaimLinkApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/workspace/imported-salons/${queryArg.id}/claim-link`,
        method: 'POST',
        body: queryArg.importedSalonClaimLinkRequest,
      }),
    }),
    putWorkspaceDeactivate: build.mutation<
      PutWorkspaceDeactivateApiResponse,
      PutWorkspaceDeactivateApiArg
    >({
      query: () => ({ url: `/v1/workspace/deactivate`, method: 'PUT' }),
    }),
    getWorkspaceEmployeeContacts: build.query<
      GetWorkspaceEmployeeContactsApiResponse,
      GetWorkspaceEmployeeContactsApiArg
    >({
      query: (queryArg) => ({ url: `/v1/workspace/employees/${queryArg.employeeId}/contacts` }),
    }),
    postWorkspaceEmployeeContacts: build.mutation<
      PostWorkspaceEmployeeContactsApiResponse,
      PostWorkspaceEmployeeContactsApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/workspace/employees/${queryArg.employeeId}/contacts`,
        method: 'POST',
        body: queryArg.contactParametersCreateCommunication,
      }),
    }),
    patchWorkspaceEmployeeContactByContactId: build.mutation<
      PatchWorkspaceEmployeeContactByContactIdApiResponse,
      PatchWorkspaceEmployeeContactByContactIdApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/workspace/employees/${queryArg.employeeId}/contacts/${queryArg.contactId}`,
        method: 'PATCH',
        body: queryArg.contactParametersPatchCommunication,
      }),
    }),
    deleteWorkspaceEmployeeContactByContactId: build.mutation<
      DeleteWorkspaceEmployeeContactByContactIdApiResponse,
      DeleteWorkspaceEmployeeContactByContactIdApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/workspace/employees/${queryArg.employeeId}/contacts/${queryArg.contactId}`,
        method: 'DELETE',
      }),
    }),
    getWorkspaceEmployees: build.query<
      GetWorkspaceEmployeesApiResponse,
      GetWorkspaceEmployeesApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/workspace/employees`,
        params: {
          parameters: queryArg.parameters,
        },
      }),
    }),
    deleteWorkspaceEmployeesById: build.mutation<
      DeleteWorkspaceEmployeesByIdApiResponse,
      DeleteWorkspaceEmployeesByIdApiArg
    >({
      query: (queryArg) => ({ url: `/v1/workspace/employees/${queryArg.id}`, method: 'DELETE' }),
    }),
    getWorkspaceEmployeesById: build.query<
      GetWorkspaceEmployeesByIdApiResponse,
      GetWorkspaceEmployeesByIdApiArg
    >({
      query: (queryArg) => ({ url: `/v1/workspace/employees/${queryArg.id}` }),
    }),
    putWorkspaceEmployeesById: build.mutation<
      PutWorkspaceEmployeesByIdApiResponse,
      PutWorkspaceEmployeesByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/workspace/employees/${queryArg.id}`,
        method: 'PUT',
        body: queryArg.employeeParametersPatch,
      }),
    }),
    getWorkspaceEmployeesCredentials: build.query<
      GetWorkspaceEmployeesCredentialsApiResponse,
      GetWorkspaceEmployeesCredentialsApiArg
    >({
      query: () => ({ url: `/v1/workspace/employees/credentials` }),
    }),
    postWorkspaceEmployeesInvite: build.mutation<
      PostWorkspaceEmployeesInviteApiResponse,
      PostWorkspaceEmployeesInviteApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/workspace/employees/invite`,
        method: 'POST',
        body: queryArg.employeeParametersInvite,
      }),
    }),
    getWorkspaceSalonContacts: build.query<
      GetWorkspaceSalonContactsApiResponse,
      GetWorkspaceSalonContactsApiArg
    >({
      query: (queryArg) => ({ url: `/v1/workspace/salons/${queryArg.salonId}/contacts` }),
    }),
    postWorkspaceSalonContacts: build.mutation<
      PostWorkspaceSalonContactsApiResponse,
      PostWorkspaceSalonContactsApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/workspace/salons/${queryArg.salonId}/contacts`,
        method: 'POST',
        body: queryArg.contactParametersCreateCommunication,
      }),
    }),
    patchWorkspaceSalonContactByContactId: build.mutation<
      PatchWorkspaceSalonContactByContactIdApiResponse,
      PatchWorkspaceSalonContactByContactIdApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/workspace/salons/${queryArg.salonId}/contacts/${queryArg.contactId}`,
        method: 'PATCH',
        body: queryArg.contactParametersPatchCommunication,
      }),
    }),
    deleteWorkspaceSalonContactByContactId: build.mutation<
      DeleteWorkspaceSalonContactByContactIdApiResponse,
      DeleteWorkspaceSalonContactByContactIdApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/workspace/salons/${queryArg.salonId}/contacts/${queryArg.contactId}`,
        method: 'DELETE',
      }),
    }),
    getWorkspaceNotifications: build.query<
      GetWorkspaceNotificationsApiResponse,
      GetWorkspaceNotificationsApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/workspace/notifications`,
        params: {
          limit: queryArg.limit,
          cursor: queryArg.cursor,
        },
      }),
    }),
    putWorkspaceNotificationsReaded: build.mutation<
      PutWorkspaceNotificationsReadedApiResponse,
      PutWorkspaceNotificationsReadedApiArg
    >({
      query: () => ({ url: `/v1/workspace/notifications/readed`, method: 'PUT' }),
    }),
    putWorkspaceNotificationsReadedById: build.mutation<
      PutWorkspaceNotificationsReadedByIdApiResponse,
      PutWorkspaceNotificationsReadedByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/workspace/notifications/readed/${queryArg.id}`,
        method: 'PUT',
      }),
    }),
    deleteWorkspaceOfftimeById: build.mutation<
      DeleteWorkspaceOfftimeByIdApiResponse,
      DeleteWorkspaceOfftimeByIdApiArg
    >({
      query: (queryArg) => ({ url: `/v1/workspace/offtime/${queryArg.id}`, method: 'DELETE' }),
    }),
    getWorkspaceOfftimeByOwner: build.query<
      GetWorkspaceOfftimeByOwnerApiResponse,
      GetWorkspaceOfftimeByOwnerApiArg
    >({
      query: (queryArg) => ({ url: `/v1/workspace/offtime/owner/${queryArg.owner}` }),
    }),
    postWorkspaceOfftimeByOwner: build.mutation<
      PostWorkspaceOfftimeByOwnerApiResponse,
      PostWorkspaceOfftimeByOwnerApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/workspace/offtime/owner/${queryArg.owner}`,
        method: 'POST',
        body: queryArg.offtimeParametersCreate,
      }),
    }),
    getWorkspacePositions: build.query<
      GetWorkspacePositionsApiResponse,
      GetWorkspacePositionsApiArg
    >({
      query: () => ({ url: `/v1/workspace/positions` }),
    }),
    postWorkspacePositions: build.mutation<
      PostWorkspacePositionsApiResponse,
      PostWorkspacePositionsApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/workspace/positions`,
        method: 'POST',
        body: queryArg.positionParametersCreate,
      }),
    }),
    deleteWorkspacePositionsById: build.mutation<
      DeleteWorkspacePositionsByIdApiResponse,
      DeleteWorkspacePositionsByIdApiArg
    >({
      query: (queryArg) => ({ url: `/v1/workspace/positions/${queryArg.id}`, method: 'DELETE' }),
    }),
    getWorkspacePositionsById: build.query<
      GetWorkspacePositionsByIdApiResponse,
      GetWorkspacePositionsByIdApiArg
    >({
      query: (queryArg) => ({ url: `/v1/workspace/positions/${queryArg.id}` }),
    }),
    putWorkspacePositionsById: build.mutation<
      PutWorkspacePositionsByIdApiResponse,
      PutWorkspacePositionsByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/workspace/positions/${queryArg.id}`,
        method: 'PUT',
        body: queryArg.positionParametersPatch,
      }),
    }),
    getWorkspaceProcedures: build.query<
      GetWorkspaceProceduresApiResponse,
      GetWorkspaceProceduresApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/workspace/procedures`,
        params: {
          parameters: queryArg.parameters,
        },
      }),
    }),
    postWorkspaceProcedures: build.mutation<
      PostWorkspaceProceduresApiResponse,
      PostWorkspaceProceduresApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/workspace/procedures`,
        method: 'POST',
        body: queryArg.procedureParametersCreate,
      }),
    }),
    deleteWorkspaceProceduresById: build.mutation<
      DeleteWorkspaceProceduresByIdApiResponse,
      DeleteWorkspaceProceduresByIdApiArg
    >({
      query: (queryArg) => ({ url: `/v1/workspace/procedures/${queryArg.id}`, method: 'DELETE' }),
    }),
    getWorkspaceProceduresById: build.query<
      GetWorkspaceProceduresByIdApiResponse,
      GetWorkspaceProceduresByIdApiArg
    >({
      query: (queryArg) => ({ url: `/v1/workspace/procedures/${queryArg.id}` }),
    }),
    putWorkspaceProceduresById: build.mutation<
      PutWorkspaceProceduresByIdApiResponse,
      PutWorkspaceProceduresByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/workspace/procedures/${queryArg.id}`,
        method: 'PUT',
        body: queryArg.procedureParametersUpdate,
      }),
    }),
    patchWorkspaceProceduresByIdSettings: build.mutation<
      PatchWorkspaceProceduresByIdSettingsApiResponse,
      PatchWorkspaceProceduresByIdSettingsApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/workspace/procedures/${queryArg.id}/settings`,
        method: 'PATCH',
        body: queryArg.procedureParametersPatchSettings,
      }),
    }),
    postWorkspaceProceduresByIdArchive: build.mutation<
      PostWorkspaceProceduresByIdArchiveApiResponse,
      PostWorkspaceProceduresByIdArchiveApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/workspace/procedures/${queryArg.id}/archive`,
        method: 'POST',
      }),
    }),
    postWorkspaceProceduresByIdRestore: build.mutation<
      PostWorkspaceProceduresByIdRestoreApiResponse,
      PostWorkspaceProceduresByIdRestoreApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/workspace/procedures/${queryArg.id}/restore`,
        method: 'POST',
      }),
    }),
    getWorkspaceProceduresByIdExecutionsByExecutionId: build.query<
      GetWorkspaceProceduresByIdExecutionsByExecutionIdApiResponse,
      GetWorkspaceProceduresByIdExecutionsByExecutionIdApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/workspace/procedures/${queryArg.id}/executions/${queryArg.executionId}`,
      }),
    }),
    patchWorkspaceProceduresByIdExecutionsByExecutionId: build.mutation<
      PatchWorkspaceProceduresByIdExecutionsByExecutionIdApiResponse,
      PatchWorkspaceProceduresByIdExecutionsByExecutionIdApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/workspace/procedures/${queryArg.id}/executions/${queryArg.executionId}`,
        method: 'PATCH',
        body: queryArg.procedureExecutionParametersPatch,
      }),
    }),
    deleteWorkspaceProceduresByIdExecutionsByExecutionId: build.mutation<
      DeleteWorkspaceProceduresByIdExecutionsByExecutionIdApiResponse,
      DeleteWorkspaceProceduresByIdExecutionsByExecutionIdApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/workspace/procedures/${queryArg.id}/executions/${queryArg.executionId}`,
        method: 'DELETE',
      }),
    }),
    getWorkspaceProducts: build.query<GetWorkspaceProductsApiResponse, GetWorkspaceProductsApiArg>({
      query: (queryArg) => ({
        url: `/v1/workspace/products`,
        params: {
          parameters: queryArg.parameters,
        },
      }),
    }),
    postWorkspaceProducts: build.mutation<
      PostWorkspaceProductsApiResponse,
      PostWorkspaceProductsApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/workspace/products`,
        method: 'POST',
        body: queryArg.productParametersCreate,
      }),
    }),
    deleteWorkspaceProductsByidBy: build.mutation<
      DeleteWorkspaceProductsByidByApiResponse,
      DeleteWorkspaceProductsByidByApiArg
    >({
      query: (queryArg) => ({ url: `/v1/workspace/products/${queryArg.id}`, method: 'DELETE' }),
    }),
    getWorkspaceProductsByidBy: build.query<
      GetWorkspaceProductsByidByApiResponse,
      GetWorkspaceProductsByidByApiArg
    >({
      query: (queryArg) => ({ url: `/v1/workspace/products/${queryArg.id}` }),
    }),
    putWorkspaceProductsByidBy: build.mutation<
      PutWorkspaceProductsByidByApiResponse,
      PutWorkspaceProductsByidByApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/workspace/products/${queryArg.id}`,
        method: 'PUT',
        body: queryArg.productParametersUpdate,
      }),
    }),
    getWorkspaceProductsByidByStockAdjustments: build.query<
      GetWorkspaceProductsByidByStockAdjustmentsApiResponse,
      GetWorkspaceProductsByidByStockAdjustmentsApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/workspace/products/${queryArg.id}/stock-adjustments`,
        params: {
          parameters: queryArg.parameters,
        },
      }),
    }),
    postWorkspaceProductsByidByStockAdjustments: build.mutation<
      PostWorkspaceProductsByidByStockAdjustmentsApiResponse,
      PostWorkspaceProductsByidByStockAdjustmentsApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/workspace/products/${queryArg.id}/stock-adjustments`,
        method: 'POST',
        body: queryArg.productStockAdjustmentParametersCreate,
      }),
    }),
    getWorkspaceProductsOptions: build.query<
      GetWorkspaceProductsOptionsApiResponse,
      GetWorkspaceProductsOptionsApiArg
    >({
      query: () => ({ url: `/v1/workspace/products/options` }),
    }),
    getWorkspaceServices: build.query<GetWorkspaceServicesApiResponse, GetWorkspaceServicesApiArg>({
      query: (queryArg) => ({
        url: `/v1/workspace/services`,
        params: {
          parameters: queryArg.parameters,
        },
      }),
    }),
    postWorkspaceServices: build.mutation<
      PostWorkspaceServicesApiResponse,
      PostWorkspaceServicesApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/workspace/services`,
        method: 'POST',
        body: queryArg.serviceParametersCreate,
      }),
    }),
    getWorkspaceServicesById: build.query<
      GetWorkspaceServicesByIdApiResponse,
      GetWorkspaceServicesByIdApiArg
    >({
      query: (queryArg) => ({ url: `/v1/workspace/services/${queryArg.id}` }),
    }),
    putWorkspaceServicesByidBy: build.mutation<
      PutWorkspaceServicesByidByApiResponse,
      PutWorkspaceServicesByidByApiArg
    >({
      query: (queryArg) => ({
        url: `/v1/workspace/services/${queryArg.id}`,
        method: 'PUT',
        body: queryArg.serviceParametersUpdate,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as _api };
export type PostAuthAppleApiResponse = /** status 200 OK */ AuthResponsesSuccessAuth;
export type PostAuthAppleApiArg = {
  /** Ключ идемпотентности для безопасного повтора неидемпотентных запросов.
    Клиент передаёт один и тот же ключ при повторе — сервер должен вернуть тот же результат, не выполняя операцию повторно.
    
    Реализация на сервере:
    - При первом запросе с ключом сохранить ключ в хранилище (например Redis/БД) вместе с ответом (status + body) и временем создания.
    - Хранить запись не менее 24 часов (рекомендуется).
    - При повторном запросе с тем же ключом в течение срока хранения вернуть сохранённый ответ (тот же status code и body), не выполняя операцию снова.
    - Ключ привязать к паре (user/device + ключ) или к ключу глобально — в зависимости от требований.
     */
  'Idempotency-Key'?: string;
  authParametersAppleToken: AuthParametersAppleToken;
};
export type PostAuthGoogleApiResponse = /** status 200 OK */ AuthResponsesSuccessAuth;
export type PostAuthGoogleApiArg = {
  /** Ключ идемпотентности для безопасного повтора неидемпотентных запросов.
    Клиент передаёт один и тот же ключ при повторе — сервер должен вернуть тот же результат, не выполняя операцию повторно.
    
    Реализация на сервере:
    - При первом запросе с ключом сохранить ключ в хранилище (например Redis/БД) вместе с ответом (status + body) и временем создания.
    - Хранить запись не менее 24 часов (рекомендуется).
    - При повторном запросе с тем же ключом в течение срока хранения вернуть сохранённый ответ (тот же status code и body), не выполняя операцию снова.
    - Ключ привязать к паре (user/device + ключ) или к ключу глобально — в зависимости от требований.
     */
  'Idempotency-Key'?: string;
  authParametersGoogleToken: AuthParametersGoogleToken;
};
export type PostAuthLogoutApiResponse = unknown;
export type PostAuthLogoutApiArg = {
  /** Ключ идемпотентности для безопасного повтора неидемпотентных запросов.
    Клиент передаёт один и тот же ключ при повторе — сервер должен вернуть тот же результат, не выполняя операцию повторно.
    
    Реализация на сервере:
    - При первом запросе с ключом сохранить ключ в хранилище (например Redis/БД) вместе с ответом (status + body) и временем создания.
    - Хранить запись не менее 24 часов (рекомендуется).
    - При повторном запросе с тем же ключом в течение срока хранения вернуть сохранённый ответ (тот же status code и body), не выполняя операцию снова.
    - Ключ привязать к паре (user/device + ключ) или к ключу глобально — в зависимости от требований.
     */
  'Idempotency-Key'?: string;
};
export type PostAuthRefreshApiResponse = /** status 200 OK */ AuthResponsesRefresh;
export type PostAuthRefreshApiArg = {
  /** Ключ идемпотентности для безопасного повтора неидемпотентных запросов.
    Клиент передаёт один и тот же ключ при повторе — сервер должен вернуть тот же результат, не выполняя операцию повторно.
    
    Реализация на сервере:
    - При первом запросе с ключом сохранить ключ в хранилище (например Redis/БД) вместе с ответом (status + body) и временем создания.
    - Хранить запись не менее 24 часов (рекомендуется).
    - При повторном запросе с тем же ключом в течение срока хранения вернуть сохранённый ответ (тот же status code и body), не выполняя операцию снова.
    - Ключ привязать к паре (user/device + ключ) или к ключу глобально — в зависимости от требований.
     */
  'Idempotency-Key'?: string;
  authParametersRefreshingToken: AuthParametersRefreshingToken;
};
export type PostMeBookingsApiResponse = /** status 200 OK */ VisitResponsesFull;
export type PostMeBookingsApiArg = {
  visitParametersCreateBooking: VisitParametersCreateBooking;
};
export type GetMeVisitsApiResponse = /** status 200 OK */ VisitResponsesItem[];
export type GetMeVisitsApiArg = {
  state: VisitListState;
};
export type GetMeVisitsByIdApiResponse = /** status 200 OK */ VisitResponsesFull;
export type GetMeVisitsByIdApiArg = {
  id: string;
};
export type PostMeVisitsByIdCancelApiResponse = unknown;
export type PostMeVisitsByIdCancelApiArg = {
  id: string;
};
export type PostMeVisitsByIdConfirmApiResponse = /** status 200 OK */ VisitResponsesFull;
export type PostMeVisitsByIdConfirmApiArg = {
  id: string;
};
export type PostMeVisitsByIdEditServicesApiResponse = /** status 200 OK */ VisitResponsesFull;
export type PostMeVisitsByIdEditServicesApiArg = {
  id: string;
  visitParametersEditServices: VisitParametersEditServices;
};
export type PostMeVisitsByIdEditClientNoteApiResponse = /** status 200 OK */ VisitResponsesFull;
export type PostMeVisitsByIdEditClientNoteApiArg = {
  id: string;
  visitParametersEditClientNote: VisitParametersEditClientNote;
};
export type PostMeVisitsByIdRescheduleApiResponse = /** status 200 OK */ VisitResponsesFull;
export type PostMeVisitsByIdRescheduleApiArg = {
  id: string;
  visitParametersReschedule: VisitParametersReschedule;
};
export type PostClicksBylinkIdByApiResponse = /** status 200 OK */ ClickResponsesMagicLink;
export type PostClicksBylinkIdByApiArg = {
  /** Идентификатор magic-ссылки (nanoId). */
  linkId: string;
  clickParametersMagicLink: ClickParametersMagicLink;
};
export type PostClicksFindApiResponse = /** status 200 OK */ ClickResponsesMagicLink;
export type PostClicksFindApiArg = {
  clickParametersMagicLink: ClickParametersMagicLink;
};
export type PostClicksFindBylinkIdByApiResponse = /** status 200 OK */ ClickResponsesMagicLink;
export type PostClicksFindBylinkIdByApiArg = {
  /** Идентификатор magic-ссылки (nanoId). */
  linkId: string;
  clickParametersMagicLink: ClickParametersMagicLink;
};
export type GetClientModelProfileApiResponse = /** status 200 OK */ ModelProfileResponsesFull;
export type GetClientModelProfileApiArg = void;
export type PostClientModelProfileApiResponse = /** status 200 OK */ ModelProfileResponsesFull;
export type PostClientModelProfileApiArg = {
  modelProfileParametersCreate: ModelProfileParametersCreate;
};
export type PutClientModelProfileApiResponse = /** status 200 OK */ ModelProfileResponsesFull;
export type PutClientModelProfileApiArg = {
  modelProfileParametersUpdate: ModelProfileParametersUpdate;
};
export type GetCustomerContactsApiResponse = /** status 200 OK */ CommunicationContact[];
export type GetCustomerContactsApiArg = void;
export type PostCustomerContactsApiResponse = /** status 200 OK */ CommunicationContact;
export type PostCustomerContactsApiArg = {
  contactParametersCreateCommunication: ContactParametersCreateCommunication;
};
export type PatchCustomerContactByContactIdApiResponse = /** status 200 OK */ CommunicationContact;
export type PatchCustomerContactByContactIdApiArg = {
  contactId: string;
  contactParametersPatchCommunication: ContactParametersPatchCommunication;
};
export type DeleteCustomerContactByContactIdApiResponse = unknown;
export type DeleteCustomerContactByContactIdApiArg = {
  contactId: string;
};
export type PostDevicesApiResponse = /** status 200 OK */ DeviceResponsesFull;
export type PostDevicesApiArg = {
  deviceParametersSystem: DeviceParametersSystem;
};
export type GetFavoritesApiResponse = /** status 200 OK */ FavoriteResponsesSalon[];
export type GetFavoritesApiArg = void;
export type PutFavoritesByIdAddApiResponse = unknown;
export type PutFavoritesByIdAddApiArg = {
  id: string;
};
export type PutFavoritesByIdRemoveApiResponse = unknown;
export type PutFavoritesByIdRemoveApiArg = {
  id: string;
};
export type GetInvitesClientBylinkIdByContactsApiResponse =
  /** status 200 OK */ InviteResponsesClientContacts;
export type GetInvitesClientBylinkIdByContactsApiArg = {
  /** Идентификатор ссылки-приглашения клиента (nanoId). */
  linkId: string;
};
export type PostInvitesClientBylinkIdByMergeApiResponse = /** status 200 OK */ InviteResponsesMerge;
export type PostInvitesClientBylinkIdByMergeApiArg = {
  /** Идентификатор ссылки-приглашения клиента (nanoId). */
  linkId: string;
  inviteClientParametersMerge: InviteClientParametersMerge;
};
export type PutInvitesEmployeeBylinkIdByApiResponse = /** status 200 OK */ InviteResponsesEmployee;
export type PutInvitesEmployeeBylinkIdByApiArg = {
  /** Идентификатор ссылки-приглашения (nanoId). */
  linkId: string;
};
export type PutInvitesSalonBylinkIdByApiResponse = /** status 200 OK */ InviteResponsesSalonClaim;
export type PutInvitesSalonBylinkIdByApiArg = {
  /** Идентификатор salon claim ссылки (nanoId). */
  linkId: string;
};
export type GetAcquisitionLeadSourcesApiResponse = /** status 200 OK */ LeadSourceResponsesList;
export type GetAcquisitionLeadSourcesApiArg = void;
export type PostAcquisitionLeadSourcesApiResponse = /** status 200 OK */ LeadSourceResponsesFull;
export type PostAcquisitionLeadSourcesApiArg = {
  leadSourceParametersCreate: LeadSourceParametersCreate;
};
export type GetAcquisitionLeadSourcesByidByApiResponse =
  /** status 200 OK */ LeadSourceResponsesDetails;
export type GetAcquisitionLeadSourcesByidByApiArg = {
  id: string;
};
export type PutAcquisitionLeadSourcesByidByApiResponse =
  /** status 200 OK */ LeadSourceResponsesFull;
export type PutAcquisitionLeadSourcesByidByApiArg = {
  id: string;
  leadSourceParametersUpdate: LeadSourceParametersUpdate;
};
export type DeleteAcquisitionLeadSourcesByidByApiResponse = unknown;
export type DeleteAcquisitionLeadSourcesByidByApiArg = {
  id: string;
};
export type GetAcquisitionLeadSourcesByidByStatsApiResponse =
  /** status 200 OK */ LeadSourceMonthlyStatsResponse;
export type GetAcquisitionLeadSourcesByidByStatsApiArg = {
  id: string;
  /** Начало месячного периода в UTC, соответствующее полуночи первого дня месяца в timezone салона. */
  start: string;
  /** Конец месячного периода в UTC, соответствующий полуночи первого дня следующего месяца в timezone салона. */
  end: string;
};
export type GetAcquisitionStatsApiResponse = /** status 200 OK */ AcquisitionStatsResponse;
export type GetAcquisitionStatsApiArg = {
  /** Начало месячного периода в UTC, соответствующее полуночи первого дня месяца в timezone салона. */
  start: string;
  /** Конец месячного периода в UTC, соответствующий полуночи первого дня следующего месяца в timezone салона. */
  end: string;
};
export type GetAcquisitionLeadSourcesByidByCampaignApiResponse =
  /** status 200 OK */ CampaignResponsesFull;
export type GetAcquisitionLeadSourcesByidByCampaignApiArg = {
  id: string;
};
export type PutAcquisitionLeadSourcesByidByCampaignApiResponse =
  /** status 200 OK */ CampaignResponsesFull;
export type PutAcquisitionLeadSourcesByidByCampaignApiArg = {
  id: string;
  leadSourceCampaignParametersUpdate: LeadSourceCampaignParametersUpdate;
};
export type PostAcquisitionLeadSourcesByidByCampaignByEventManagerByManualApiResponse =
  /** status 200 OK */ CampaignResponsesFull;
export type PostAcquisitionLeadSourcesByidByCampaignByEventManagerByManualApiArg = {
  id: string;
  manualEventManagerConnectParameters: ManualEventManagerConnectParametersWrite;
};
export type GetAcquisitionLeadSourcesByidByPromoterApiResponse =
  /** status 200 OK */ PromoterResponsesFull;
export type GetAcquisitionLeadSourcesByidByPromoterApiArg = {
  id: string;
};
export type PutAcquisitionLeadSourcesByidByPromoterApiResponse =
  /** status 200 OK */ PromoterResponsesFull;
export type PutAcquisitionLeadSourcesByidByPromoterApiArg = {
  id: string;
  promoterParametersUpdate: PromoterParametersUpdate;
};
export type GetNotificationsApiResponse = /** status 200 OK */ NoticeResponsesFull[];
export type GetNotificationsApiArg = void;
export type PutNotificationsReadedApiResponse = unknown;
export type PutNotificationsReadedApiArg = void;
export type PutNotificationsReadedByIdApiResponse = unknown;
export type PutNotificationsReadedByIdApiArg = {
  id: string;
};
export type GetBillingRedirectApiResponse =
  /** status 200 HTML-страница для браузера с переходом в приложение. */ BillingResponsesRedirect;
export type GetBillingRedirectApiArg = {
  /** Параметры возврата из внешнего billing flow. */
  parameters?: BillingRedirectQuery;
};
export type PostBillingSessionResolveApiResponse =
  /** status 200 Billing session resolved to a billing context. */ BillingSessionContext;
export type PostBillingSessionResolveApiArg = {
  billingSessionResolveRequest: BillingSessionResolveRequest;
};
export type GetPublicVisitByBookingIdApiResponse =
  /** status 200 Public visit state for a booking. */ VisitResponsesFull;
export type GetPublicVisitByBookingIdApiArg = {
  /** Идентификатор booking. */
  id: string;
};
export type PostPublicBookingBySalonIdApiResponse =
  /** status 200 Created public visit. */ VisitResponsesFull;
export type PostPublicBookingBySalonIdApiArg = {
  /** Идентификатор салона. */
  salonId: string;
  publicBookingParametersCreate: PublicBookingParametersCreate;
};
export type GetPublicBookingSalonCatalogApiResponse = /** status 200 OK */ SalonResponsesCatalog;
export type GetPublicBookingSalonCatalogApiArg = {
  salonId: string;
};
export type GetPublicBookingSalonMastersApiResponse = /** status 200 OK */ SalonResponsesMasters;
export type GetPublicBookingSalonMastersApiArg = {
  salonId: string;
};
export type GetPublicBookingSalonProfileApiResponse = /** status 200 OK */ SalonResponsesProfile;
export type GetPublicBookingSalonProfileApiArg = {
  salonId: string;
};
export type GetSalonBysalonIdByCatalogApiResponse = /** status 200 OK */ SalonResponsesCatalog;
export type GetSalonBysalonIdByCatalogApiArg = {
  salonId: string;
};
export type GetSalonBysalonIdByMastersApiResponse = /** status 200 OK */ SalonResponsesMasters;
export type GetSalonBysalonIdByMastersApiArg = {
  salonId: string;
};
export type GetSalonBysalonIdByProfileApiResponse = /** status 200 OK */ SalonResponsesProfile;
export type GetSalonBysalonIdByProfileApiArg = {
  salonId: string;
};
export type GetSearchApiResponse = /** status 200 OK */ SearchResponsesFull;
export type GetSearchApiArg = {
  /** Параметры поиска, геофильтрации и пагинации. */
  parameters?: SearchParametersRetrieve;
};
export type PostWorkspaceBillingPortalSessionApiResponse =
  /** status 200 Hosted billing portal session created. */ BillingPortalSession;
export type PostWorkspaceBillingPortalSessionApiArg = void;
export type GetWorkspaceBillingCatalogApiResponse =
  /** status 200 Billing catalog for the active workplace. */ BillingCatalogResponse;
export type GetWorkspaceBillingCatalogApiArg = void;
export type PostWorkspaceBillingSessionApiResponse =
  /** status 200 Billing session created for the active workplace. */ BillingSession;
export type PostWorkspaceBillingSessionApiArg = void;
export type PostWorkspaceBillingCheckoutSessionApiResponse =
  /** status 200 Hosted checkout session created for the active workplace. */ BillingCheckoutSession;
export type PostWorkspaceBillingCheckoutSessionApiArg = {
  /** Ключ идемпотентности для безопасного повтора неидемпотентных запросов.
    Клиент передаёт один и тот же ключ при повторе — сервер должен вернуть тот же результат, не выполняя операцию повторно.
    
    Реализация на сервере:
    - При первом запросе с ключом сохранить ключ в хранилище (например Redis/БД) вместе с ответом (status + body) и временем создания.
    - Хранить запись не менее 24 часов (рекомендуется).
    - При повторном запросе с тем же ключом в течение срока хранения вернуть сохранённый ответ (тот же status code и body), не выполняя операцию снова.
    - Ключ привязать к паре (user/device + ключ) или к ключу глобально — в зависимости от требований.
     */
  'Idempotency-Key'?: string;
  billingCheckoutSessionRequest: BillingCheckoutSessionRequest;
};
export type PostWorkspaceBillingChangePlanApiResponse =
  /** status 200 Billing summary after changing the current subscription plan. */ BillingSummary;
export type PostWorkspaceBillingChangePlanApiArg = {
  /** Ключ идемпотентности для безопасного повтора неидемпотентных запросов.
    Клиент передаёт один и тот же ключ при повторе — сервер должен вернуть тот же результат, не выполняя операцию повторно.
    
    Реализация на сервере:
    - При первом запросе с ключом сохранить ключ в хранилище (например Redis/БД) вместе с ответом (status + body) и временем создания.
    - Хранить запись не менее 24 часов (рекомендуется).
    - При повторном запросе с тем же ключом в течение срока хранения вернуть сохранённый ответ (тот же status code и body), не выполняя операцию снова.
    - Ключ привязать к паре (user/device + ключ) или к ключу глобально — в зависимости от требований.
     */
  'Idempotency-Key'?: string;
  billingPlanChangeRequest: BillingPlanChangeRequest;
};
export type PostWorkspaceBillingCancelApiResponse =
  /** status 200 Billing summary after scheduling or performing subscription cancellation. */ BillingSummary;
export type PostWorkspaceBillingCancelApiArg = {
  /** Ключ идемпотентности для безопасного повтора неидемпотентных запросов.
    Клиент передаёт один и тот же ключ при повторе — сервер должен вернуть тот же результат, не выполняя операцию повторно.
    
    Реализация на сервере:
    - При первом запросе с ключом сохранить ключ в хранилище (например Redis/БД) вместе с ответом (status + body) и временем создания.
    - Хранить запись не менее 24 часов (рекомендуется).
    - При повторном запросе с тем же ключом в течение срока хранения вернуть сохранённый ответ (тот же status code и body), не выполняя операцию снова.
    - Ключ привязать к паре (user/device + ключ) или к ключу глобально — в зависимости от требований.
     */
  'Idempotency-Key'?: string;
  billingSubscriptionCancelRequest: BillingSubscriptionCancelRequest;
};
export type GetWorkspaceBillingSummaryApiResponse =
  /** status 200 Billing summary for the active workplace. */ BillingSummary;
export type GetWorkspaceBillingSummaryApiArg = void;
export type PostWorkspaceConnectOnboardingLinkApiResponse =
  /** status 200 Hosted Connect onboarding link created. */ ConnectOnboardingLink;
export type PostWorkspaceConnectOnboardingLinkApiArg = {
  /** Ключ идемпотентности для безопасного повтора неидемпотентных запросов.
    Клиент передаёт один и тот же ключ при повторе — сервер должен вернуть тот же результат, не выполняя операцию повторно.
    
    Реализация на сервере:
    - При первом запросе с ключом сохранить ключ в хранилище (например Redis/БД) вместе с ответом (status + body) и временем создания.
    - Хранить запись не менее 24 часов (рекомендуется).
    - При повторном запросе с тем же ключом в течение срока хранения вернуть сохранённый ответ (тот же status code и body), не выполняя операцию снова.
    - Ключ привязать к паре (user/device + ключ) или к ключу глобально — в зависимости от требований.
     */
  'Idempotency-Key'?: string;
};
export type GetWorkspaceConnectStatusApiResponse =
  /** status 200 Connect onboarding and payout status for the active workplace. */ ConnectAccountStatus;
export type GetWorkspaceConnectStatusApiArg = void;
export type PostTimetablesByOwnerByForceApiResponse = unknown;
export type PostTimetablesByOwnerByForceApiArg = {
  /** Владелец расписания (employee:uuid или salon:uuid). */
  owner: TimetableOwner;
  /** true — перезаписать пересекающиеся слоты; false — только добавить. */
  force: boolean;
  timetableParametersCreatePattern: TimetableParametersCreatePattern;
};
export type GetTimetablesSchedulesApiResponse = /** status 200 OK */ TimetableResponsesSchedule[];
export type GetTimetablesSchedulesApiArg = {
  /** Параметры выборки расписаний (владельцы и период). */
  parameters: TimetableParametersRetrieve;
};
export type PostTimetablesSearchSlotsApiResponse = /** status 200 OK */
  | TimetableResponsesProcedureSlots
  | TimetableResponsesComplexSlots;
export type PostTimetablesSearchSlotsApiArg = {
  /** Параметры поиска слотов (салон и дата). */
  query: TimetableParametersSearchSlotQuery;
  body: TimetableParametersSearchSlotComplex | TimetableParametersSearchSlotProcedure;
};
export type PostUploadThumbApiResponse = /** status 200 OK */ string;
export type PostUploadThumbApiArg = {
  /** Ключ идемпотентности для безопасного повтора неидемпотентных запросов.
    Клиент передаёт один и тот же ключ при повторе — сервер должен вернуть тот же результат, не выполняя операцию повторно.
    
    Реализация на сервере:
    - При первом запросе с ключом сохранить ключ в хранилище (например Redis/БД) вместе с ответом (status + body) и временем создания.
    - Хранить запись не менее 24 часов (рекомендуется).
    - При повторном запросе с тем же ключом в течение срока хранения вернуть сохранённый ответ (тот же status code и body), не выполняя операцию снова.
    - Ключ привязать к паре (user/device + ключ) или к ключу глобально — в зависимости от требований.
     */
  'Idempotency-Key'?: string;
  uploadParametersThumb: UploadParametersThumb;
};
export type DeleteUsersApiResponse = unknown;
export type DeleteUsersApiArg = void;
export type GetUsersApiResponse = /** status 200 OK */ UserResponsesUserInfo;
export type GetUsersApiArg = void;
export type PutUsersApiResponse = /** status 200 OK */ UserResponsesUserInfo;
export type PutUsersApiArg = {
  userParametersPatch: UserParametersPatch;
};
export type GetUserRecoveryMethodsApiResponse = /** status 200 OK */ RecoveryMethod[];
export type GetUserRecoveryMethodsApiArg = void;
export type PostUserRecoveryMethodsApiResponse = /** status 200 OK */ RecoveryMethod;
export type PostUserRecoveryMethodsApiArg = {
  recoveryParametersCreateMethod: RecoveryParametersCreateMethod;
};
export type PatchUserRecoveryMethodByRecoveryMethodIdApiResponse =
  /** status 200 OK */ RecoveryMethod;
export type PatchUserRecoveryMethodByRecoveryMethodIdApiArg = {
  /** Идентификатор recovery method. */
  recoveryMethodId: string;
  recoveryParametersPatchMethod: RecoveryParametersPatchMethod;
};
export type DeleteUserRecoveryMethodByRecoveryMethodIdApiResponse = unknown;
export type DeleteUserRecoveryMethodByRecoveryMethodIdApiArg = {
  recoveryMethodId: string;
};
export type PostUsersCustomerApiResponse = /** status 200 OK */ CustomerResponsesRegistration;
export type PostUsersCustomerApiArg = {
  customerParametersRegistration: CustomerParametersRegistration;
};
export type DownloadAppleWalletBookingPassApiResponse =
  /** status 200 Бинарный .pkpass файл для добавления в Apple Wallet */ AppleWalletPassBinary;
export type DownloadAppleWalletBookingPassApiArg = {
  id: string;
};
export type GetWalletGoogleBookingByidByApiResponse =
  /** status 200 URL для добавления пропуска в Google Wallet */ string;
export type GetWalletGoogleBookingByidByApiArg = {
  id: string;
};
export type DeleteWorkspaceApiResponse = unknown;
export type DeleteWorkspaceApiArg = void;
export type GetWorkspaceApiResponse = /** status 200 OK */ WorkspaceResponsesPartial[];
export type GetWorkspaceApiArg = void;
export type PostWorkspaceApiResponse = /** status 200 OK */ WorkspaceResponsesFull;
export type PostWorkspaceApiArg = {
  workspaceParametersCreate: WorkspaceParametersCreate;
};
export type PutWorkspaceApiResponse = /** status 200 OK */ WorkspaceResponsesFull;
export type PutWorkspaceApiArg = {
  workspaceParametersPatch: WorkspaceParametersPatch;
};
export type GetWorkspaceByIdApiResponse = /** status 200 OK */ WorkspaceResponsesFull;
export type GetWorkspaceByIdApiArg = {
  id: string;
};
export type PutWorkspaceActivateApiResponse = /** status 200 OK */ WorkspaceResponsesFull;
export type PutWorkspaceActivateApiArg = void;
export type PostWorkspaceAppointmentStartApiResponse =
  /** status 200 Booking c обновлённым timeline после старта appointment. */ WorkspaceBookingFull;
export type PostWorkspaceAppointmentStartApiArg = {
  appointmentId: string;
  /** Опциональные параметры старта appointment. */
  workspaceAppointmentParametersStart: WorkspaceAppointmentParametersStart;
};
export type PostWorkspaceAppointmentCompleteApiResponse =
  /** status 200 Booking c обновлённым timeline после завершения appointment. */ WorkspaceBookingFull;
export type PostWorkspaceAppointmentCompleteApiArg = {
  appointmentId: string;
  /** Опциональные параметры завершения appointment. */
  workspaceAppointmentParametersComplete: WorkspaceAppointmentParametersComplete;
};
export type PostWorkspaceAppointmentNoShowApiResponse =
  /** status 200 Booking c обновлённым timeline после отметки no-show. */ WorkspaceBookingFull;
export type PostWorkspaceAppointmentNoShowApiArg = {
  appointmentId: string;
  /** Опциональные параметры отметки no-show. */
  workspaceAppointmentParametersNoShow: WorkspaceAppointmentParametersNoShow;
};
export type GetWorkspaceBookingsApiResponse =
  /** status 200 Список bookings для заданного состояния. */ WorkspaceBookingListResponse;
export type GetWorkspaceBookingsApiArg = {
  /** Состояние выборки для списка. `active` — актуальные/рабочие записи, `history` — завершённые и закрытые.
   */
  state: WorkspaceBookingListState;
};
export type PostWorkspaceBookingsApiResponse =
  /** status 201 Booking успешно создан. */ WorkspaceBookingFull;
export type PostWorkspaceBookingsApiArg = {
  /** Ключ идемпотентности для безопасного повтора неидемпотентных запросов.
    Клиент передаёт один и тот же ключ при повторе — сервер должен вернуть тот же результат, не выполняя операцию повторно.
    
    Реализация на сервере:
    - При первом запросе с ключом сохранить ключ в хранилище (например Redis/БД) вместе с ответом (status + body) и временем создания.
    - Хранить запись не менее 24 часов (рекомендуется).
    - При повторном запросе с тем же ключом в течение срока хранения вернуть сохранённый ответ (тот же status code и body), не выполняя операцию снова.
    - Ключ привязать к паре (user/device + ключ) или к ключу глобально — в зависимости от требований.
     */
  'Idempotency-Key'?: string;
  /** Параметры создания booking в workspace. */
  workspaceBookingParametersCreate: WorkspaceBookingParametersCreate;
};
export type GetWorkspaceBookingByIdApiResponse =
  /** status 200 Полные данные booking. */ WorkspaceBookingFull;
export type GetWorkspaceBookingByIdApiArg = {
  /** Идентификатор booking. */
  bookingId: string;
};
export type PostWorkspaceBookingApproveApiResponse =
  /** status 200 Booking после подтверждения. */ WorkspaceBookingFull;
export type PostWorkspaceBookingApproveApiArg = {
  /** Идентификатор booking. */
  bookingId: string;
  /** Опциональная защита от гонок (optimistic locking).
    Передавайте значение ETag (revision) из последнего GET/POST. При несовпадении вернётся 409.
     */
  'If-Match'?: string;
};
export type PostWorkspaceBookingRejectApiResponse =
  /** status 200 Booking после отклонения. */ WorkspaceBookingFull;
export type PostWorkspaceBookingRejectApiArg = {
  /** Идентификатор booking. */
  bookingId: string;
  /** Опциональная защита от гонок (optimistic locking).
    Передавайте значение ETag (revision) из последнего GET/POST. При несовпадении вернётся 409.
     */
  'If-Match'?: string;
};
export type PostWorkspaceBookingCancelApiResponse =
  /** status 200 Booking после отмены. */ WorkspaceBookingFull;
export type PostWorkspaceBookingCancelApiArg = {
  /** Идентификатор booking. */
  bookingId: string;
  /** Опциональная защита от гонок (optimistic locking).
    Передавайте значение ETag (revision) из последнего GET/POST. При несовпадении вернётся 409.
     */
  'If-Match'?: string;
};
export type PostWorkspaceBookingRescheduleApiResponse =
  /** status 200 Booking после переноса. */ WorkspaceBookingFull;
export type PostWorkspaceBookingRescheduleApiArg = {
  /** Идентификатор booking. */
  bookingId: string;
  /** Опциональная защита от гонок (optimistic locking).
    Передавайте значение ETag (revision) из последнего GET/POST. При несовпадении вернётся 409.
     */
  'If-Match'?: string;
  /** Параметры переноса booking/appointment. */
  workspaceBookingParametersReschedule: WorkspaceBookingParametersReschedule;
};
export type PostWorkspaceBookingEditServicesApiResponse =
  /** status 200 Booking после изменения состава услуг. */ WorkspaceBookingFull;
export type PostWorkspaceBookingEditServicesApiArg = {
  /** Идентификатор booking. */
  bookingId: string;
  /** Опциональная защита от гонок (optimistic locking).
    Передавайте значение ETag (revision) из последнего GET/POST. При несовпадении вернётся 409.
     */
  'If-Match'?: string;
  /** Параметры изменения состава услуг booking. */
  workspaceBookingParametersEditServices: WorkspaceBookingParametersEditServices;
};
export type PostWorkspaceBookingAddStaffNodeApiResponse =
  /** status 200 Booking после добавления заметки сотрудника. */ WorkspaceBookingFull;
export type PostWorkspaceBookingAddStaffNodeApiArg = {
  /** Идентификатор booking. */
  bookingId: string;
  /** Опциональная защита от гонок (optimistic locking).
    Передавайте значение ETag (revision) из последнего GET/POST. При несовпадении вернётся 409.
     */
  'If-Match'?: string;
  /** Текст заметки сотрудника для активного appointment. */
  workspaceBookingParametersAddStaffNode: WorkspaceBookingParametersAddStaffNode;
};
export type GetWorkspaceClientsApiResponse =
  /** status 200 Список изменений клиентов для синхронизации (inserted, updated, deleted) и cursor для следующего запроса. */ WorkspaceResponsesClientsSync;
export type GetWorkspaceClientsApiArg = {
  /** Параметры выборки клиентов. При указании since возвращаются только изменения (inserted/updated/deleted) с указанного момента. */
  parameters?: WorkspaceClientsListQuery;
};
export type PostWorkspaceClientsApiResponse =
  /** status 200 Карточка созданного клиента. */ ClientResponsesClientInfo;
export type PostWorkspaceClientsApiArg = {
  clientParametersCreate: ClientParametersCreate;
};
export type GetWorkspaceClientsByIdApiResponse =
  /** status 200 Карточка клиента. */ ClientResponsesClientInfo;
export type GetWorkspaceClientsByIdApiArg = {
  /** Идентификатор клиента. */
  id: string;
};
export type PutWorkspaceClientsByIdApiResponse =
  /** status 200 Карточка обновлённого клиента. */ ClientResponsesClientInfo;
export type PutWorkspaceClientsByIdApiArg = {
  id: string;
  clientParametersPatch: ClientParametersPatch;
};
export type GetWorkspaceClientContactsApiResponse = /** status 200 OK */ CommunicationContact[];
export type GetWorkspaceClientContactsApiArg = {
  /** Идентификатор salon client. */
  clientId: string;
};
export type PostWorkspaceClientContactsApiResponse = /** status 200 OK */ CommunicationContact;
export type PostWorkspaceClientContactsApiArg = {
  /** Идентификатор salon client. */
  clientId: string;
  contactParametersCreateCommunication: ContactParametersCreateCommunication;
};
export type PatchWorkspaceClientContactByContactIdApiResponse =
  /** status 200 OK */ CommunicationContact;
export type PatchWorkspaceClientContactByContactIdApiArg = {
  clientId: string;
  /** Идентификатор communication contact. */
  contactId: string;
  contactParametersPatchCommunication: ContactParametersPatchCommunication;
};
export type DeleteWorkspaceClientContactByContactIdApiResponse = unknown;
export type DeleteWorkspaceClientContactByContactIdApiArg = {
  clientId: string;
  contactId: string;
};
export type GetWorkspaceClientsByIdByLinkCandidatesApiResponse =
  /** status 200 Privacy-safe кандидаты на линковку клиента. */ ClientLinkCandidate[];
export type GetWorkspaceClientsByIdByLinkCandidatesApiArg = {
  /** Идентификатор клиента. */
  id: string;
};
export type PostWorkspaceClientsByIdByLinksApiResponse =
  /** status 200 Подтверждённая линковка клиента. */ ClientLink;
export type PostWorkspaceClientsByIdByLinksApiArg = {
  /** Идентификатор клиента. */
  id: string;
  clientParametersCreateLink: ClientParametersCreateLink;
};
export type GetWorkspaceComplexApiResponse = /** status 200 OK */ ComplexResponsesAll;
export type GetWorkspaceComplexApiArg = {
  /** Параметры фильтрации и пагинации списка комплексов. */
  parameters?: ComplexParametersAll;
};
export type PostWorkspaceComplexApiResponse = /** status 200 OK */ ComplexHelpersComplexResponse;
export type PostWorkspaceComplexApiArg = {
  complexParametersCreate: ComplexParametersCreate;
};
export type DeleteWorkspaceComplexByIdApiResponse = unknown;
export type DeleteWorkspaceComplexByIdApiArg = {
  id: string;
};
export type GetWorkspaceComplexByIdApiResponse = /** status 200 OK */ ComplexHelpersComplexResponse;
export type GetWorkspaceComplexByIdApiArg = {
  id: string;
};
export type PutWorkspaceComplexByIdApiResponse = /** status 200 OK */ ComplexHelpersComplexResponse;
export type PutWorkspaceComplexByIdApiArg = {
  id: string;
  complexParametersUpdate: ComplexParametersUpdate;
};
export type PostWorkspaceImportedSalonsPreviewApiResponse =
  /** status 200 OK */ ImportedSalonPreviewResponse;
export type PostWorkspaceImportedSalonsPreviewApiArg = {
  importedSalonPreviewRequest: ImportedSalonPreviewRequest;
};
export type PostWorkspaceImportedSalonsCommitApiResponse =
  /** status 200 OK */ ImportedSalonCommitResponse;
export type PostWorkspaceImportedSalonsCommitApiArg = {
  importedSalonCommitRequest: ImportedSalonCommitRequest;
};
export type PostWorkspaceImportedSalonsClaimLinkApiResponse =
  /** status 200 OK */ ImportedSalonClaimLinkResponse;
export type PostWorkspaceImportedSalonsClaimLinkApiArg = {
  id: string;
  importedSalonClaimLinkRequest: ImportedSalonClaimLinkRequest;
};
export type PutWorkspaceDeactivateApiResponse = /** status 200 OK */ WorkspaceResponsesFull;
export type PutWorkspaceDeactivateApiArg = void;
export type GetWorkspaceEmployeeContactsApiResponse = /** status 200 OK */ CommunicationContact[];
export type GetWorkspaceEmployeeContactsApiArg = {
  employeeId: string;
};
export type PostWorkspaceEmployeeContactsApiResponse = /** status 200 OK */ CommunicationContact;
export type PostWorkspaceEmployeeContactsApiArg = {
  employeeId: string;
  contactParametersCreateCommunication: ContactParametersCreateCommunication;
};
export type PatchWorkspaceEmployeeContactByContactIdApiResponse =
  /** status 200 OK */ CommunicationContact;
export type PatchWorkspaceEmployeeContactByContactIdApiArg = {
  employeeId: string;
  contactId: string;
  contactParametersPatchCommunication: ContactParametersPatchCommunication;
};
export type DeleteWorkspaceEmployeeContactByContactIdApiResponse = unknown;
export type DeleteWorkspaceEmployeeContactByContactIdApiArg = {
  employeeId: string;
  contactId: string;
};
export type GetWorkspaceEmployeesApiResponse = /** status 200 OK */ EmployeeResponsesPartial[];
export type GetWorkspaceEmployeesApiArg = {
  /** Параметры выборки списка сотрудников. */
  parameters?: EmployeeParametersAll;
};
export type DeleteWorkspaceEmployeesByIdApiResponse = unknown;
export type DeleteWorkspaceEmployeesByIdApiArg = {
  id: string;
};
export type GetWorkspaceEmployeesByIdApiResponse = /** status 200 OK */ EmployeeResponsesFull;
export type GetWorkspaceEmployeesByIdApiArg = {
  id: string;
};
export type PutWorkspaceEmployeesByIdApiResponse = /** status 200 OK */ EmployeeResponsesFull;
export type PutWorkspaceEmployeesByIdApiArg = {
  id: string;
  employeeParametersPatch: EmployeeParametersPatch;
};
export type GetWorkspaceEmployeesCredentialsApiResponse = /** status 200 OK */ CredentialsSet;
export type GetWorkspaceEmployeesCredentialsApiArg = void;
export type PostWorkspaceEmployeesInviteApiResponse = /** status 200 OK */ EmployeeResponsesFull;
export type PostWorkspaceEmployeesInviteApiArg = {
  employeeParametersInvite: EmployeeParametersInvite;
};
export type GetWorkspaceSalonContactsApiResponse = /** status 200 OK */ CommunicationContact[];
export type GetWorkspaceSalonContactsApiArg = {
  salonId: string;
};
export type PostWorkspaceSalonContactsApiResponse = /** status 200 OK */ CommunicationContact;
export type PostWorkspaceSalonContactsApiArg = {
  salonId: string;
  contactParametersCreateCommunication: ContactParametersCreateCommunication;
};
export type PatchWorkspaceSalonContactByContactIdApiResponse =
  /** status 200 OK */ CommunicationContact;
export type PatchWorkspaceSalonContactByContactIdApiArg = {
  salonId: string;
  contactId: string;
  contactParametersPatchCommunication: ContactParametersPatchCommunication;
};
export type DeleteWorkspaceSalonContactByContactIdApiResponse = unknown;
export type DeleteWorkspaceSalonContactByContactIdApiArg = {
  salonId: string;
  contactId: string;
};
export type GetWorkspaceNotificationsApiResponse = /** status 200 OK */ NoticeResponsesFull[];
export type GetWorkspaceNotificationsApiArg = {
  /** Max items per page. */
  limit?: number;
  /** Opaque cursor for the next slice. */
  cursor?: string;
};
export type PutWorkspaceNotificationsReadedApiResponse = unknown;
export type PutWorkspaceNotificationsReadedApiArg = void;
export type PutWorkspaceNotificationsReadedByIdApiResponse = unknown;
export type PutWorkspaceNotificationsReadedByIdApiArg = {
  id: string;
};
export type DeleteWorkspaceOfftimeByIdApiResponse = unknown;
export type DeleteWorkspaceOfftimeByIdApiArg = {
  id: string;
};
export type GetWorkspaceOfftimeByOwnerApiResponse = /** status 200 OK */ OfftimeResponsesFull[];
export type GetWorkspaceOfftimeByOwnerApiArg = {
  /** Владелец расписания (employee:uuid или salon:uuid). */
  owner: TimetableOwner;
};
export type PostWorkspaceOfftimeByOwnerApiResponse = /** status 200 OK */ OfftimeResponsesFull;
export type PostWorkspaceOfftimeByOwnerApiArg = {
  /** Владелец расписания (employee:uuid или salon:uuid). */
  owner: TimetableOwner;
  offtimeParametersCreate: OfftimeParametersCreate;
};
export type GetWorkspacePositionsApiResponse = /** status 200 OK */ PositionResponsesFull[];
export type GetWorkspacePositionsApiArg = void;
export type PostWorkspacePositionsApiResponse = /** status 200 OK */ PositionResponsesFull;
export type PostWorkspacePositionsApiArg = {
  positionParametersCreate: PositionParametersCreate;
};
export type DeleteWorkspacePositionsByIdApiResponse = unknown;
export type DeleteWorkspacePositionsByIdApiArg = {
  id: string;
};
export type GetWorkspacePositionsByIdApiResponse = /** status 200 OK */ PositionResponsesFull;
export type GetWorkspacePositionsByIdApiArg = {
  id: string;
};
export type PutWorkspacePositionsByIdApiResponse = /** status 200 OK */ PositionResponsesFull;
export type PutWorkspacePositionsByIdApiArg = {
  id: string;
  positionParametersPatch: PositionParametersPatch;
};
export type GetWorkspaceProceduresApiResponse = /** status 200 OK */ ProcedureResponsesAll;
export type GetWorkspaceProceduresApiArg = {
  /** Параметры фильтрации и пагинации списка процедур. */
  parameters?: ProcedureParametersAll;
};
export type PostWorkspaceProceduresApiResponse =
  /** status 200 OK */ ProcedureHelpersProcedureResponse;
export type PostWorkspaceProceduresApiArg = {
  procedureParametersCreate: ProcedureParametersCreate;
};
export type DeleteWorkspaceProceduresByIdApiResponse = unknown;
export type DeleteWorkspaceProceduresByIdApiArg = {
  id: string;
};
export type GetWorkspaceProceduresByIdApiResponse =
  /** status 200 OK */ ProcedureHelpersProcedureResponse;
export type GetWorkspaceProceduresByIdApiArg = {
  id: string;
};
export type PutWorkspaceProceduresByIdApiResponse =
  /** status 200 OK */ ProcedureHelpersProcedureResponse;
export type PutWorkspaceProceduresByIdApiArg = {
  id: string;
  procedureParametersUpdate: ProcedureParametersUpdate;
};
export type PatchWorkspaceProceduresByIdSettingsApiResponse =
  /** status 200 OK */ ProcedureHelpersProcedureResponse;
export type PatchWorkspaceProceduresByIdSettingsApiArg = {
  id: string;
  procedureParametersPatchSettings: ProcedureParametersPatchSettings;
};
export type PostWorkspaceProceduresByIdArchiveApiResponse = unknown;
export type PostWorkspaceProceduresByIdArchiveApiArg = {
  id: string;
};
export type PostWorkspaceProceduresByIdRestoreApiResponse =
  /** status 200 OK */ ProcedureHelpersProcedureResponse;
export type PostWorkspaceProceduresByIdRestoreApiArg = {
  id: string;
};
export type GetWorkspaceProceduresByIdExecutionsByExecutionIdApiResponse =
  /** status 200 OK */ ProcedureHelpersExecutionResponse;
export type GetWorkspaceProceduresByIdExecutionsByExecutionIdApiArg = {
  id: string;
  executionId: string;
};
export type PatchWorkspaceProceduresByIdExecutionsByExecutionIdApiResponse =
  /** status 200 OK */ ProcedureHelpersExecutionResponse;
export type PatchWorkspaceProceduresByIdExecutionsByExecutionIdApiArg = {
  id: string;
  executionId: string;
  procedureExecutionParametersPatch: ProcedureExecutionParametersPatch;
};
export type DeleteWorkspaceProceduresByIdExecutionsByExecutionIdApiResponse = unknown;
export type DeleteWorkspaceProceduresByIdExecutionsByExecutionIdApiArg = {
  id: string;
  executionId: string;
};
export type GetWorkspaceProductsApiResponse = /** status 200 OK */ ProductResponsesList;
export type GetWorkspaceProductsApiArg = {
  parameters?: ProductParametersAll;
};
export type PostWorkspaceProductsApiResponse = /** status 200 OK */ ProductResponsesProduct;
export type PostWorkspaceProductsApiArg = {
  productParametersCreate: ProductParametersCreate;
};
export type DeleteWorkspaceProductsByidByApiResponse = unknown;
export type DeleteWorkspaceProductsByidByApiArg = {
  id: string;
};
export type GetWorkspaceProductsByidByApiResponse = /** status 200 OK */ ProductResponsesProduct;
export type GetWorkspaceProductsByidByApiArg = {
  id: string;
};
export type PutWorkspaceProductsByidByApiResponse = /** status 200 OK */ ProductResponsesProduct;
export type PutWorkspaceProductsByidByApiArg = {
  id: string;
  productParametersUpdate: ProductParametersUpdate;
};
export type GetWorkspaceProductsByidByStockAdjustmentsApiResponse =
  /** status 200 OK */ ProductStockAdjustmentResponsesList;
export type GetWorkspaceProductsByidByStockAdjustmentsApiArg = {
  id: string;
  parameters?: ProductStockAdjustmentParametersAll;
};
export type PostWorkspaceProductsByidByStockAdjustmentsApiResponse =
  /** status 200 OK */ ProductStockAdjustmentResponsesStockAdjustment;
export type PostWorkspaceProductsByidByStockAdjustmentsApiArg = {
  id: string;
  productStockAdjustmentParametersCreate: ProductStockAdjustmentParametersCreate;
};
export type GetWorkspaceProductsOptionsApiResponse = /** status 200 OK */ ProductResponsesOptions;
export type GetWorkspaceProductsOptionsApiArg = void;
export type GetWorkspaceServicesApiResponse = /** status 200 OK */ ServiceResponsesAll;
export type GetWorkspaceServicesApiArg = {
  /** Параметры фильтрации и пагинации списка услуг. */
  parameters?: ServiceParametersAll;
};
export type PostWorkspaceServicesApiResponse = /** status 200 OK */ ServiceResponsesCreate;
export type PostWorkspaceServicesApiArg = {
  serviceParametersCreate: ServiceParametersCreate;
};
export type GetWorkspaceServicesByIdApiResponse = /** status 200 OK */ ServiceResponsesRetrieve;
export type GetWorkspaceServicesByIdApiArg = {
  id: string;
};
export type PutWorkspaceServicesByidByApiResponse = /** status 200 OK */ ServiceResponsesRetrieve;
export type PutWorkspaceServicesByidByApiArg = {
  id: string;
  serviceParametersUpdate: ServiceParametersUpdate;
};
export type Token = {
  expiration: string;
  value: string;
};
export type AuthInternalUserInfo = {
  avatar?: string;
  haveRecoveryMethod: boolean;
  haveCustomer: boolean;
  haveEmployee: boolean;
  id: string;
  nickname?: string;
};
export type AuthResponsesSuccessAuth = {
  accessToken: Token;
  refreshToken: Token;
  user: AuthInternalUserInfo;
};
export type ApiError = {
  /** Stable application error code (e.g. "VALIDATION_ERROR", "UNAUTHORIZED"). */
  code: string;
  /** Additional payload for validation fields or debug metadata. */
  details?: {
    [key: string]: string;
  };
  /** Human-readable error message. */
  message: string;
  /** HTTP status code. */
  status: number;
};
export type AuthParametersAppleToken = {
  email?: string;
  emailVerified?: boolean;
  firstName?: string;
  lastName?: string;
  token: string;
};
export type AuthParametersGoogleToken = {
  firstName?: string;
  lastName?: string;
  token: string;
};
export type AuthResponsesRefresh = {
  accessToken: Token;
  refreshToken?: Token;
};
export type AuthParametersRefreshingToken = {
  token: string;
};
export type VisitStatus =
  | 'pending_master'
  | 'pending_client'
  | 'confirmed'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'no_show'
  | 'expired';
export type VisitPaymentStatus = 'unpaid' | 'pending_confirmation' | 'paid' | 'failed' | 'refunded';
export type VisitAllowedAction = 'cancel' | 'reschedule' | 'edit_services' | 'confirm';
export type VisitSalon = {
  id?: string;
  name?: string;
  logoUrl?: string;
};
export type Address = {
  address: string;
  city: string;
  country: string;
  id?: string;
  latitude: number;
  longitude: number;
};
export type Price = {
  amount: number;
  currency: string;
};
export type VisitExecutor = {
  id: string;
  masterId: string;
  name: string;
  avatar: string;
  price?: Price;
  duration?: number;
};
export type VisitProcedure = {
  id: string;
  executor?: VisitExecutor;
  title: string;
};
export type VisitComplex = {
  id: string;
  title: string;
  procedures: VisitProcedure[];
};
export type VisitSelectedServiceComplex = {
  complex: VisitComplex;
};
export type VisitSelectedServiceProcedure = {
  procedure: VisitProcedure;
};
export type VisitSelectedService = VisitSelectedServiceComplex | VisitSelectedServiceProcedure;
export type VisitResponsesFull = {
  id: string;
  status: VisitStatus;
  paymentStatus: VisitPaymentStatus;
  startTime?: string;
  endTime?: string;
  timezoneId: string;
  priceMinor: number;
  discountPriceMinor?: number;
  currency: string;
  clientNote?: string | null;
  allowedActions: VisitAllowedAction[];
  salon: VisitSalon;
  address?: Address;
  service: VisitSelectedService;
};
export type CreateBookingSelectedProcedure = {
  procedureId: string;
  executionId?: string;
};
export type CreateBookingSelectedServiceProcedure = {
  procedure: CreateBookingSelectedProcedure;
};
export type CreateBookingSelectedComplexItem = {
  procedureId: string;
  executionId?: string;
};
export type CreateBookingSelectedComplex = {
  complexId: string;
  items: CreateBookingSelectedComplexItem[];
};
export type CreateBookingSelectedServiceComplex = {
  complex: CreateBookingSelectedComplex;
};
export type CreateBookingSelectedService =
  | CreateBookingSelectedServiceProcedure
  | CreateBookingSelectedServiceComplex;
export type VisitParametersCreateBooking = {
  salonId: string;
  selectedService: CreateBookingSelectedService;
  requestedStartTime?: string;
  requestedEndTime?: string;
  clientNote?: string;
};
export type VisitServicePreview = {
  title: string;
  executorName?: string;
};
export type VisitResponsesItem = {
  id: string;
  status: VisitStatus;
  paymentStatus?: VisitPaymentStatus;
  startTime?: string;
  endTime?: string;
  timezoneId: string;
  priceMinor: number;
  discountPriceMinor?: number;
  currency: string;
  salon: VisitSalon;
  services: VisitServicePreview[];
};
export type VisitListState = 'active' | 'history';
export type VisitParametersEditServices = {
  selectedService: CreateBookingSelectedService;
};
export type VisitParametersEditClientNote = {
  clientNote: string | null;
};
export type VisitParametersReschedule = {
  requestedStartTime: string;
  requestedEndTime: string;
};
export type MagicLinkKind = 'employeeInvite' | 'clientInvite' | 'marketing' | 'salonClaim';
export type MagicLinkPayload = {
  clientId?: string;
  employeeId?: string;
  leadSourceId?: string;
  campaignId?: string;
  salonId?: string;
};
export type LinkAppTarget = 'consumer' | 'console' | 'booking';
export type LinkFallbackTarget = 'webBooking' | 'appStore' | 'playStore' | 'unsupported';
export type ClickResponsesMagicLink = {
  nanoId: string;
  kind: MagicLinkKind;
  payload?: MagicLinkPayload;
  appTarget?: LinkAppTarget;
  appUrl?: string;
  fallbackTarget?: LinkFallbackTarget;
  fallbackUrl?: string;
  isOneTime: boolean;
  expiresAt?: string;
  usedAt?: string;
  createdAt?: string;
};
export type ClickParametersMagicLink = {
  language: string;
  languages: string[];
  cores: number;
  memory: number;
  screenWidth: number;
  screenHeight: number;
  colorDepth: number;
  pixelRatio: number;
  timeZone: string;
};
export type ModelProfileStatus = 'active' | 'suspended';
export type Gender = 'male' | 'female';
export type AvailabilityDaysMask = number;
export type AvailabilityTimesMask = number;
export type AvailabilityTagsMask = number;
export type RestrictionsMask = number;
export type ModelProfileResponsesFull = {
  id: string;
  customerId: string;
  status: ModelProfileStatus;
  photos: string[];
  gender?: Gender;
  birthDate?: string;
  address: Address;
  radiusMeters: number;
  availabilityDaysMask: AvailabilityDaysMask;
  availabilityTimesMask: AvailabilityTimesMask;
  availabilityTagsMask?: AvailabilityTagsMask;
  restrictionsMask: RestrictionsMask;
  favoritesOnly: boolean;
  agreeToShootingAndMaterialUsage: boolean;
  agreeToPlatformRules: boolean;
  createdAt: string;
  updatedAt?: string;
};
export type ModelProfileParametersCreate = {
  address: Address;
  radiusMeters: number;
  photos: string[];
  gender?: Gender;
  birthDate: string;
  availabilityDaysMask?: AvailabilityDaysMask;
  availabilityTimesMask?: AvailabilityTimesMask;
  availabilityTagsMask?: AvailabilityTagsMask;
  restrictionsMask?: RestrictionsMask;
  favoritesOnly: boolean;
  agreeToShootingAndMaterialUsage: boolean;
  agreeToPlatformRules: boolean;
};
export type ModelProfileParametersUpdate = {
  status?: ModelProfileStatus;
  address?: Address;
  radiusMeters?: number;
  photos?: string[];
  gender?: Gender;
  birthDate?: string;
  availabilityDaysMask?: AvailabilityDaysMask;
  availabilityTimesMask?: AvailabilityTimesMask;
  availabilityTagsMask?: AvailabilityTagsMask;
  restrictionsMask?: RestrictionsMask;
  favoritesOnly?: boolean;
  agreeToShootingAndMaterialUsage?: boolean;
  agreeToPlatformRules?: boolean;
};
export type ContactChannel = 'phone' | 'email' | 'telegram' | 'instagram';
export type CommunicationContactDeliveryPreference = 'sms' | 'call' | 'whatsapp';
export type ContactVerificationStatus = 'unverified' | 'pending' | 'verified';
export type CommunicationContact = {
  channel: ContactChannel;
  /** Список предпочтений связи для phone. Для других каналов обычно отсутствует.
   */
  deliveryPreferences?: CommunicationContactDeliveryPreference[];
  /** Идентификатор communication contact assignment. */
  id: string;
  /** Является ли этот contact primary в communication scope владельца. */
  isPrimary: boolean;
  /** Маскированное представление value для безопасного отображения в UI и privacy-safe ответах.
   */
  maskedValue: string;
  /** Отображаемое значение контакта. Сервер может возвращать нормализованное значение, но должен сохранять channel-specific семантику.
   */
  value: string;
  verificationStatus: ContactVerificationStatus;
  /** Момент подтверждения контакта в этом communication context. */
  verifiedAt?: string;
};
export type ContactParametersCreateCommunication = {
  channel: ContactChannel;
  /** Предпочтения доставки для phone. Для остальных каналов сервер должен отклонять поле как невалидное.
   */
  deliveryPreferences?: CommunicationContactDeliveryPreference[];
  /** Делает новый contact primary внутри owner-specific communication scope. При true сервер должен снять primary с предыдущего primary контакта того же владельца.
   */
  isPrimary?: boolean;
  /** Сырое значение контакта, которое сервер нормализует и сохраняет в виде канонического contact point.
   */
  value: string;
};
export type ContactParametersPatchCommunication = {
  /** Новый набор delivery preferences для phone. Пустой массив допустим как явное очищение предпочтений.
   */
  deliveryPreferences?: CommunicationContactDeliveryPreference[];
  /** При true сервер должен сделать контакт primary в рамках owner-specific communication scope.
   */
  isPrimary?: boolean;
};
export type VersionType = 'latest' | 'stable' | 'unsupported';
export type DeviceResponsesFull = {
  id: string;
  version?: VersionType;
};
export type SystemTypeVersion = {
  version: string;
};
export type SystemType = {
  android?: SystemTypeVersion;
  chrome?: SystemTypeVersion;
  edge?: SystemTypeVersion;
  firefox?: SystemTypeVersion;
  ios?: SystemTypeVersion;
  opera?: SystemTypeVersion;
  safari?: SystemTypeVersion;
};
export type DeviceParametersSystem = {
  appVersion?: string;
  country?: string;
  fcmToken?: string;
  manufacturer?: string;
  model?: string;
  system?: SystemType;
};
export type SalonType = 'individual' | 'chain' | 'single';
export type FavoriteResponsesSalon = {
  address: Address;
  id: string;
  isActive: boolean;
  logo: string;
  name: string;
  type: SalonType;
};
export type MaskedContact = {
  type: string;
  value: string;
  masked: string;
};
export type InviteResponsesClientContacts = {
  contacts: MaskedContact[];
  salonId: string;
  salonName: string;
  salonLogo?: string;
  clientId?: string;
};
export type InviteResponsesMerge = {
  id: string;
  alias?: string;
};
export type InviteClientParametersMerge = {
  /** Значение контакта для верификации (сырая строка из контактов клиента). */
  contact: string;
};
export type InviteResponsesEmployee = {
  id: string;
  nickname: string;
  logo?: string;
  position: string;
};
export type InviteResponsesSalonClaim = {
  importedSalonId: string;
  workspaceId: string;
  createdWorkspace: boolean;
  claimState: string;
};
export type LeadSourceType = 'manual' | 'ads' | 'influencer' | 'shared' | 'marketplace';
export type LeadSourceStatus = 'active' | 'disabled';
export type LeadSourceResponsesFull = {
  id: string;
  salonId: string;
  type: LeadSourceType;
  status: LeadSourceStatus;
  name: string;
  description?: string;
  visualIconName?: string;
  visualColorHex?: string;
  publicCode: string;
  link: string;
  clicksCount: number;
  appointmentsCreated: number;
  conversionRate?: number;
  createdAt?: string;
  updatedAt?: string;
};
export type LeadSourceResponsesList = LeadSourceResponsesFull[];
export type LeadSourceCreateBase = {
  type: 'manual' | 'ads' | 'influencer';
  name: string;
  description?: string;
  visualIconName?: string;
  visualColorHex?: string;
};
export type LeadSourceManualCreate = LeadSourceCreateBase & {
  type?: 'manual';
};
export type AdIntegrationProvider = 'meta' | 'google' | 'tiktok' | 'snapchat';
export type Money = {
  /** Сумма в минорных единицах (центы). */
  amountMinor: number;
  /** ISO 4217 currency code. */
  currency: string;
};
export type LeadSourceCampaignParametersCreate = {
  provider: AdIntegrationProvider;
  adIntegrationId?: string;
  budget?: Money;
  spentBudget?: Money;
};
export type LeadSourceAdsCreate = LeadSourceCreateBase & {
  type?: 'ads';
  campaign: LeadSourceCampaignParametersCreate;
};
export type PromoterParametersCreate = {
  userId?: string | null;
  displayName: string;
};
export type LeadSourceInfluencerCreate = LeadSourceCreateBase & {
  type?: 'influencer';
  promoter: PromoterParametersCreate;
};
export type LeadSourceParametersCreate =
  | LeadSourceManualCreate
  | LeadSourceAdsCreate
  | LeadSourceInfluencerCreate;
export type LeadSourceDailyStats = {
  [key: string]: number;
};
export type LeadSourceResponsesDetails = {
  id: string;
  salonId: string;
  type: LeadSourceType;
  status: LeadSourceStatus;
  name: string;
  description?: string;
  visualIconName?: string;
  visualColorHex?: string;
  publicCode: string;
  link: string;
  clicksCount: number;
  appointmentsCreated: number;
  conversionRate?: number;
  clicksByDay?: LeadSourceDailyStats;
  appointmentsByDay?: LeadSourceDailyStats;
  createdAt?: string;
  updatedAt?: string;
};
export type LeadSourceParametersUpdate = {
  name?: string;
  description?: string;
  visualIconName?: string;
  visualColorHex?: string;
};
export type LeadSourceMonthlyStatsResponse = {
  leadSourceId: string;
  periodStart: string;
  periodEnd: string;
  clicksCount: number;
  appointmentsCreated: number;
  conversionRate?: number;
  clicksByDay?: LeadSourceDailyStats;
  appointmentsByDay?: LeadSourceDailyStats;
};
export type AcquisitionStatsResponse = LeadSourceMonthlyStatsResponse[];
export type AdIntegrationResponsesFull = {
  id: string;
  salonId: string;
  provider: AdIntegrationProvider;
  externalId: string;
  displayName?: string;
  isEnabled?: boolean;
  createdAt?: string;
  updatedAt?: string;
};
export type AdEventDestinationKind = 'pixel' | 'conversion_api';
export type AcquisitionEventType =
  | 'click'
  | 'signup'
  | 'booking_created'
  | 'booking_completed'
  | 'payment_received'
  | 'manual_adjustment';
export type AdEventDestinationResponsesFull = {
  id: string;
  salonId: string;
  adIntegrationId: string;
  kind: AdEventDestinationKind;
  eventKind: AcquisitionEventType;
  externalId: string;
  accessTokenRef?: string;
  displayName?: string;
  isEnabled?: boolean;
  createdAt?: string;
  updatedAt?: string;
};
export type CampaignResponsesFull = {
  id: string;
  salonId: string;
  leadSourceId: string;
  name: string;
  description?: string;
  adIntegrationId?: string;
  adIntegration?: AdIntegrationResponsesFull;
  adEventDestination?: AdEventDestinationResponsesFull;
  budget?: Money;
  spentBudget?: Money;
  leadSourcePublicCode?: string;
  leadSourceLink?: string;
  clicksCount?: number;
  appointmentsCreated?: number;
  conversionRate?: number;
  createdAt?: string;
  updatedAt?: string;
};
export type LeadSourceCampaignParametersUpdate = {
  name?: string;
  description?: string;
  adIntegrationId?: string;
  budget?: Money;
  clearBudget?: boolean;
  spentBudget?: Money;
  clearSpentBudget?: boolean;
};
export type ManualEventManagerConnectMetaParameters = {
  metaPixelId: string;
  testEventCode?: string;
};
export type ManualEventManagerConnectMetaParametersWrite = {
  metaPixelId: string;
  capiAccessToken: string;
  testEventCode?: string;
};
export type ManualEventManagerConnectTikTokParameters = {
  tiktokPixelId: string;
  testEventCode?: string;
  testMode?: boolean;
};
export type ManualEventManagerConnectTikTokParametersWrite = {
  tiktokPixelId: string;
  eventsApiAccessToken: string;
  testEventCode?: string;
  testMode?: boolean;
};
export type ManualEventManagerConnectSnapchatParameters = {
  pixelId: string;
};
export type ManualEventManagerConnectSnapchatParametersWrite = {
  pixelId: string;
  conversionsApiAccessToken: string;
};
export type ManualEventManagerConnectParameters =
  | ManualEventManagerConnectMetaParameters
  | ManualEventManagerConnectTikTokParameters
  | ManualEventManagerConnectSnapchatParameters;
export type ManualEventManagerConnectParametersWrite =
  | ManualEventManagerConnectMetaParametersWrite
  | ManualEventManagerConnectTikTokParametersWrite
  | ManualEventManagerConnectSnapchatParametersWrite;
export type PromoterResponsesFull = {
  id: string;
  leadSourceId: string;
  salonId: string;
  userId?: string | null;
  displayName: string;
  createdAt?: string;
  updatedAt?: string;
};
export type PromoterParametersUpdate = {
  userId?: string | null;
  displayName?: string;
};
export type NoticeResponsesFull = {
  category: string;
  date?: string;
  id: string;
  isRead: boolean;
  messageKey: string;
  parameters: {
    [key: string]: string;
  };
  titleKey: string;
};
export type BillingResponsesRedirect = string;
export type BillingRedirectQuery = {
  /** Статус завершения внешнего billing flow. */
  status?: string;
  /** Идентификатор checkout/session у платёжного провайдера. */
  session_id?: string;
  /** Текст ошибки, который вернул платёжный провайдер. */
  error?: string;
};
export type BillingSessionContext = {
  /** Device identifier bound to the billing session. */
  deviceId: string;
  /** Salon bound to the billing session. */
  salonId: string;
};
export type BillingSessionResolveRequest = {
  /** Short-lived signed billing session token. */
  session: string;
};
export type SafeDateInterval = {
  end: string;
  start: string;
};
export type PublicBookingParametersCreate = {
  /** Имя клиента. */
  clientName: string;
  /** Телефон клиента. */
  clientPhone: string;
  /** Идентификатор процедуры для одиночной записи. Должен быть передан, если не передан `complexId`. */
  procedureId?: string;
  /** Идентификатор исполнителя. Допустим только вместе с `procedureId`. */
  executorId?: string;
  /** Идентификатор комплекса. Должен быть передан, если не передан `procedureId`. */
  complexId?: string;
  time: SafeDateInterval;
  /** Идентификатор маркетинговой ссылки/кампании. */
  trackingId?: string;
};
export type ProcedureHelpersExecutionResponse = {
  currency: string;
  duration: number;
  id: string;
  procedureId?: string;
  serviceId?: string;
  masterAvatar: string;
  masterId: string;
  masterName: string;
  price: number;
};
export type ServiceTags =
  | 'barbershop'
  | 'nails'
  | 'massage'
  | 'spa'
  | 'cosmetology'
  | 'hairdressing'
  | 'epilation'
  | 'permanent makeup'
  | 'piercing'
  | 'makeup'
  | 'brows'
  | 'lashes';
export type TranslatedServiceTag = {
  tag: ServiceTags;
  translate: string;
};
export type ProcedureAccessType = 'independentFromGender' | 'menOnly' | 'womenOnly';
export type ProcedureHelpersProcedureResponse = {
  currency: string;
  description?: string;
  executions: ProcedureHelpersExecutionResponse[];
  id: string;
  minDuration: number;
  minPrice: Price;
  serviceId: string;
  serviceTags: TranslatedServiceTag[];
  serviceTitle: string;
  title: string;
  isOnline?: boolean;
  onlineBookingEnabled?: boolean;
  accessType?: ProcedureAccessType;
  postServiceBreakDuration?: number | null;
  archived?: boolean;
};
export type ComplexHelpersPriceShift = {
  percent: number;
};
export type ComplexHelpersExecutionResponse = {
  currency: string;
  duration: number;
  id: string;
  masterAvatar: string;
  masterId: string;
  masterName: string;
  price: number;
};
export type ComplexHelpersProcedureResponse = {
  currency: string;
  description?: string;
  executions: ComplexHelpersExecutionResponse[];
  id: string;
  minDuration: number;
  minPrice: Price;
  serviceId: string;
  serviceTags: TranslatedServiceTag[];
  serviceTitle: string;
  title: string;
  isOnline?: boolean;
};
export type ComplexHelpersComplexResponse = {
  description?: string;
  id: string;
  isOnline?: boolean;
  priceShift: ComplexHelpersPriceShift;
  procedures: ComplexHelpersProcedureResponse[];
  title: string;
};
export type SalonResponsesCatalog = {
  procedures: ProcedureHelpersProcedureResponse[];
  complexes: ComplexHelpersComplexResponse[];
};
export type SalonResponsesMaster = {
  id: string;
  nickname: string;
  logo: string;
  position: string;
};
export type SalonResponsesMasters = SalonResponsesMaster[];
export type SalonResponsesProfile = {
  id: string;
  name: string;
  type: SalonType;
  description?: string;
  logo: string;
  isActive: boolean;
  isFavorite: boolean;
  localeId: string;
  timeZoneId: string;
  address: Address;
  inviteLink?: string;
};
export type SearchResponsesHelpersSalon = {
  address: Address;
  id: string;
  isFavorite: boolean;
  logo: string;
  name: string;
  type: SalonType;
};
export type SearchResponsesHelpersSuggest = {
  value: string;
};
export type SearchResponsesFull = {
  salons: SearchResponsesHelpersSalon[];
  suggests: SearchResponsesHelpersSuggest[];
};
export type Pagination = {
  page: number;
  per: number;
};
export type SearchParametersRetrieve = {
  latitude?: number;
  longitude?: number;
  pagination?: Pagination;
  salonType?: SalonType;
  value?: string;
};
export type BillingPortalSession = {
  url: string;
};
export type BillingCatalogPlanCode = 'free' | 'start' | 'grow' | 'scale' | 'enterprise';
export type BillingPlanInterval = 'monthly' | 'yearly';
export type BillingSeatTier = {
  fromSeat: number;
  toSeat?: number | null;
  seatPrice: Price;
};
export type BillingCatalogCadence = {
  interval: BillingPlanInterval;
  basePrice: Price;
  includedSeats: number;
  seatTiers: BillingSeatTier[];
};
export type BillingPlanAvailability = 'free' | 'selfServe' | 'contactSales';
export type BillingCatalogPlan = {
  code: BillingCatalogPlanCode;
  title: string;
  headline: string;
  summary: string;
  includedSeats: number;
  monthly?: BillingCatalogCadence | null;
  yearly?: BillingCatalogCadence | null;
  availability: BillingPlanAvailability;
  anchor: boolean;
};
export type BillingCatalogResponse = {
  plans: BillingCatalogPlan[];
};
export type BillingSession = {
  /** Short-lived signed billing session token. */
  session: string;
  /** Expiration timestamp for the billing session token. */
  expiresAt: string;
};
export type BillingCheckoutSession = {
  url: string;
  quotedTotalPrice?: Price | null;
};
export type BillingPlanCode = 'start' | 'grow' | 'scale';
export type BillingCheckoutSessionRequest = {
  plan: BillingPlanCode;
  interval: BillingPlanInterval;
};
export type SalonStripeProfile = {
  customerId?: string | null;
  connectedAccountId?: string | null;
  terminalLocationId?: string | null;
};
export type BillingSubscriptionSnapshot = {
  title: string;
  planCode?: BillingPlanCode | null;
  interval: BillingPlanInterval;
  price: Price;
  startDate: string;
  endDate: string;
  stripeId?: string | null;
};
export type BillingSmsCreditPack = {
  id: string;
  title: string;
  credits: number;
  price: Price;
  expiresAtPeriodEnd: boolean;
};
export type BillingSummary = {
  stripeProfile?: SalonStripeProfile | null;
  currentSubscription?: BillingSubscriptionSnapshot | null;
  activeSeats: number;
  customerPortalAvailable: boolean;
  /** Controls whether the console should render the Open Billing action in PlanWidget. */
  showOpenBillingButton: boolean;
  smsCreditBalance?: number | null;
  smsPacks: BillingSmsCreditPack[];
};
export type BillingPlanChangeRequest = {
  plan: BillingPlanCode;
  interval: BillingPlanInterval;
};
export type BillingSubscriptionCancelRequest = {
  /** Если `true`, backend может попытаться выполнить immediate cancellation. Если поле отсутствует, применяется default policy cancel at period end. */
  immediate?: boolean | null;
};
export type ConnectOnboardingLink = {
  url: string;
};
export type ConnectOnboardingState = 'notStarted' | 'pending' | 'restricted' | 'active';
export type ConnectAccountStatus = {
  connectedAccountId?: string | null;
  state: ConnectOnboardingState;
  chargesEnabled: boolean;
  payoutsEnabled: boolean;
  tapToPayEligible: boolean;
  statusMessage?: string | null;
};
export type TimetableOwner = string;
export type ScheduleDay = {
  offTime: string[];
  workTime: string;
};
export type ScheduleWeek = {
  friday?: ScheduleDay;
  monday?: ScheduleDay;
  saturday?: ScheduleDay;
  sunday?: ScheduleDay;
  thursday?: ScheduleDay;
  tuesday?: ScheduleDay;
  wednesday?: ScheduleDay;
};
export type SchedulePatternWeekly = {
  weekly: ScheduleWeek;
};
export type SchedulePatternDaily = {
  daily: ScheduleDay;
};
export type SchedulePatternSwitchly = {
  startDay: string;
  workDays: {
    [key: string]: ScheduleDay;
  };
  restDays: number;
};
export type SchedulePattern =
  | SchedulePatternWeekly
  | SchedulePatternDaily
  | SchedulePatternSwitchly;
export type TimetableParametersCreatePattern = {
  endAt?: string;
  schedule?: SchedulePattern;
  startAt: string;
};
export type TimetableResponsesSchedule = {
  intervals: SafeDateInterval[];
  owner: TimetableOwner;
  timeZoneId: string;
};
export type TimetableParametersRetrieve = {
  owners: TimetableOwner[];
  period: SafeDateInterval;
};
export type TimetableResponsesProcedureSlots = {
  intervals: SafeDateInterval[];
  timeZoneId: string;
};
export type TimetableResponsesComplexSlotsSlotProcedure = {
  executorId: string;
  id: string;
  time: SafeDateInterval;
};
export type TimetableResponsesComplexSlotsSlot = {
  procedures: TimetableResponsesComplexSlotsSlotProcedure[];
  total: SafeDateInterval;
};
export type TimetableResponsesComplexSlots = {
  slots: TimetableResponsesComplexSlotsSlot[];
  timeZoneId: string;
};
export type TimetableParametersSearchSlotQuery = {
  salonId: string;
  date?: string;
};
export type TimetableParametersSearchSlotProcedure = {
  executorId?: string;
  id: string;
};
export type TimetableParametersSearchSlotComplex = {
  id: string;
  procedures: TimetableParametersSearchSlotProcedure[];
};
export type UploadParametersThumb = {
  /** Файл изображения (JPEG, PNG, GIF, BMP) */
  image: Blob;
};
export type UserResponsesUserInfo = {
  avatar: string;
  haveCustomer: boolean;
  haveEmployee: boolean;
  id: string;
  nickname: string;
};
export type UserParametersPatch = {
  avatar?: string;
  nickname?: string;
};
export type RecoveryMethod = {
  channel: ContactChannel;
  /** Идентификатор recovery method assignment. */
  id: string;
  /** Является ли recovery method primary в recovery scope пользователя. */
  isPrimary: boolean;
  /** Маскированное значение recovery method для безопасного отображения. */
  maskedValue: string;
  /** Нормализованное или отображаемое значение recovery method. */
  value: string;
  verificationStatus: ContactVerificationStatus;
  /** Момент подтверждения recovery method в recovery context. */
  verifiedAt?: string;
};
export type RecoveryParametersCreateMethod = {
  channel: ContactChannel;
  /** Делает recovery method primary внутри recovery scope пользователя. При true сервер должен снять primary с предыдущего primary method.
   */
  isPrimary?: boolean;
  /** Сырое значение recovery method. Сервер нормализует его по channel, но не превращает автоматически в communication contact.
   */
  value: string;
};
export type RecoveryParametersPatchMethod = {
  /** При true сервер должен сделать recovery method primary в recovery scope пользователя.
   */
  isPrimary?: boolean;
};
export type CustomerResponsesRegistration = {
  accessToken: Token;
};
export type ContactPointInput = {
  channel: ContactChannel;
  value: string;
};
export type CustomerParametersRegistration = {
  contact?: ContactPointInput;
};
export type AppleWalletPassBinary = Blob;
export type WorkspaceResponsesPartial = {
  address: Address;
  id: string;
  inviteLink?: string;
  logo: string;
  name: string;
  type: SalonType;
};
export type WorkspaceResponsesFull = {
  address: Address;
  createdAt: string;
  description?: string;
  employeeToken: Token;
  id: string;
  inviteLink?: string;
  isActive: boolean;
  localeId: string;
  /** ISO 4217 currency code. */
  currencyCode?: string;
  logo: string;
  name: string;
  timeZoneId: string;
  type: SalonType;
};
export type WorkspaceParametersCreate = {
  address: Address;
  contact?: ContactPointInput;
  description?: string;
  localeId: string;
  /** ISO 4217 currency code. */
  currencyCode?: string;
  logo?: string;
  name: string;
  timetable?: TimetableParametersCreatePattern;
  timeZoneId: string;
  type: SalonType;
};
export type WorkspaceParametersPatch = {
  address?: Address;
  description?: string;
  /** ISO 4217 currency code. */
  currencyCode?: string;
  logo?: string;
  name?: string;
  type?: SalonType;
};
export type WorkspaceBookingStatus = 'pending' | 'active' | 'closed';
export type WorkspaceBookingClosedReason = 'completed' | 'abandoned' | 'rejected' | 'expired';
export type WorkspacePendingActor = 'client' | 'staff';
export type WorkspaceClientFull = {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  telegram?: string;
  instagramm?: string;
};
export type WorkspaceSelectedProcedure = {
  procedureId: string;
  /** Вариация/исполнение процедуры (если применимо). */
  executionId?: string;
  /** Предпочтительный сотрудник для процедуры. */
  staffId?: string;
};
export type WorkspaceSelectedServiceProcedure = {
  procedure: WorkspaceSelectedProcedure;
};
export type WorkspaceSelectedComplexItem = {
  procedureId: string;
  /** Вариация/исполнение процедуры. */
  executionId?: string;
  /** Предпочтительный сотрудник для элемента комплекса. */
  staffId?: string;
  /** Смещение от начала booking в минутах. */
  offsetMinutes?: number;
  /** Длительность элемента в минутах. */
  durationMinutes?: number;
};
export type WorkspaceSelectedComplex = {
  complexId: string;
  items: WorkspaceSelectedComplexItem[];
};
export type WorkspaceSelectedServiceComplex = {
  complex: WorkspaceSelectedComplex;
};
export type WorkspaceSelectedService =
  | WorkspaceSelectedServiceProcedure
  | WorkspaceSelectedServiceComplex;
export type WorkspacePaymentStatus =
  | 'unpaid'
  | 'pending_confirmation'
  | 'paid'
  | 'failed'
  | 'refunded';
export type WorkspaceAppointmentStatus =
  | 'scheduled'
  | 'in_progress'
  | 'completed'
  | 'no_show'
  | 'cancelled';
export type WorkspaceAppointmentCancelReason =
  | 'rescheduled'
  | 'cancelled_by_client'
  | 'cancelled_by_salon'
  | 'expired'
  | 'system';
export type WorkspaceAssignment = {
  id: string;
  /** Процедура, которая выполняется в assignment. */
  procedureId: string;
  /** Сотрудник-исполнитель assignment. */
  staffId: string;
  startTime: string;
  endTime: string;
  /** Короткий заголовок assignment для UI. */
  title?: string;
};
export type WorkspaceAppointmentVersion = {
  id: string;
  status: WorkspaceAppointmentStatus;
  cancelReason?: WorkspaceAppointmentCancelReason;
  startTime: string;
  endTime: string;
  assignments?: WorkspaceAssignment[];
  price?: Money;
  paymentStatus: WorkspacePaymentStatus;
  /** Время создания версии appointment. */
  createdAt?: string;
  /** Время фактического старта appointment. */
  startedAt?: string;
  /** Время фактического завершения appointment. */
  completedAt?: string;
};
export type WorkspaceAllowedAction =
  | 'approve'
  | 'reject'
  | 'cancel'
  | 'reschedule'
  | 'start'
  | 'complete'
  | 'no_show';
export type WorkspaceBookingFull = {
  id: string;
  /** Ревизия booking для optimistic locking. */
  revision: number;
  status: WorkspaceBookingStatus;
  closedReason?: WorkspaceBookingClosedReason;
  pendingActor?: WorkspacePendingActor;
  /** Таймзона booking (IANA ID). */
  timezoneId: string;
  client: WorkspaceClientFull;
  /** Клиентская заметка, сохранённая в booking. */
  clientNote?: string;
  selectedService: WorkspaceSelectedService;
  /** Отображаемое время начала (если согласовано). */
  displayStartTime?: string;
  /** Отображаемое время окончания (если согласовано). */
  displayEndTime?: string;
  /** Заголовок booking для UI. */
  displayTitle?: string;
  /** Краткий список услуг для отображения. */
  servicesPreview?: string[];
  totalPrice?: Money;
  paymentStatus: WorkspacePaymentStatus;
  timeline: WorkspaceAppointmentVersion[];
  allowedActions: WorkspaceAllowedAction[];
};
export type WorkspaceAppointmentParametersStart = {
  /** Время старта. Если не передано, используется время сервера. */
  startedAt?: string;
};
export type WorkspaceAppointmentParametersComplete = {
  /** Время завершения. Если не передано, используется время сервера. */
  completedAt?: string;
  /** Комментарий сотрудника при завершении. */
  note?: string;
};
export type WorkspaceAppointmentParametersNoShow = {
  /** Время отметки no-show. Если не передано, используется время сервера. */
  markedAt?: string;
  /** Комментарий сотрудника к no-show. */
  note?: string;
};
export type WorkspaceClientShort = {
  id: string;
  name: string;
  /** Телефон клиента для быстрого звонка. */
  phone?: string;
  /** Email клиента для связи. */
  email?: string;
  /** Telegram username/ссылка для связи. */
  telegram?: string;
  /** Instagram username/ссылка для связи. */
  instagramm?: string;
};
export type WorkspaceAppointmentSummary = {
  id: string;
  status: WorkspaceAppointmentStatus;
  startTime: string;
  endTime: string;
  assignments?: WorkspaceAssignment[];
  price?: Money;
  paymentStatus: WorkspacePaymentStatus;
};
export type WorkspaceBookingListItem = {
  id: string;
  /** Ревизия booking для optimistic locking. */
  revision: number;
  status: WorkspaceBookingStatus;
  closedReason?: WorkspaceBookingClosedReason;
  pendingActor?: WorkspacePendingActor;
  /** Таймзона booking (IANA ID). */
  timezoneId: string;
  /** Отображаемое время начала (может отсутствовать). */
  displayStartTime?: string;
  /** Отображаемое время окончания (может отсутствовать). */
  displayEndTime?: string;
  client: WorkspaceClientShort;
  displayTitle: string;
  totalPrice?: Money;
  paymentStatus: WorkspacePaymentStatus;
  currentAppointment?: WorkspaceAppointmentSummary;
  allowedActions: WorkspaceAllowedAction[];
};
export type WorkspaceBookingListResponse = {
  items: WorkspaceBookingListItem[];
};
export type WorkspaceBookingListState = 'active' | 'history' | 'all';
export type WorkspaceBookingParametersCreate = {
  /** Идентификатор существующего клиента. */
  clientId: string;
  selectedService: WorkspaceSelectedService;
  /** Запрошенное время начала записи. */
  requestedStartTime: string;
  /** Запрошенное время окончания записи. */
  requestedEndTime: string;
  /** Если true, booking сразу подтверждается. */
  autoConfirm?: boolean;
  /** Ручной override итоговой стоимости. */
  priceOverride?: Money;
};
export type WorkspaceBookingParametersReschedule = {
  /** Новое время начала. */
  startTime: string;
  /** Новое время окончания. */
  endTime: string;
  /** Assignment, относительно которого рассчитывается перенос. */
  anchorAssignmentId?: string;
  /** Новый сотрудник для anchor/единственного assignment. */
  targetStaffId?: string;
};
export type WorkspaceBookingParametersEditServices = {
  selectedService: WorkspaceSelectedService;
};
export type WorkspaceBookingParametersAddStaffNode = {
  note: string;
};
export type ClientResponsesClientInfo = {
  /** Псевдоним клиента в салоне. */
  alias?: string;
  /** Ссылка на аватар клиента. */
  avatar: string;
  /** Основные контакты клиента. */
  contacts: CommunicationContact[];
  /** Идентификатор клиента. */
  id: string;
  /** Ссылка-приглашение для объединения профиля клиента. */
  inviteLink?: string;
  /** Пол клиента. */
  gender?: Gender;
  /** Дата рождения клиента. */
  birthDate?: string;
  /** Имя клиента. */
  name: string;
};
export type WorkspaceResponsesClientsSync = {
  /** Новые клиенты с момента since. */
  inserted: ClientResponsesClientInfo[];
  /** Обновлённые клиенты с момента since. */
  updated: ClientResponsesClientInfo[];
  /** Идентификаторы клиентов, удалённых с момента since. */
  deleted: string[];
  /** Маркер времени сервера для следующего sync-запроса. */
  cursor?: string;
};
export type WorkspaceClientsListQuery = {
  /** При указании возвращаются только клиенты, добавленные/обновлённые/удалённые с этой даты (для синка локальной базы). */
  since?: string;
};
export type ClientParametersCreate = {
  /** Отображаемое имя клиента в интерфейсе мастера. */
  alias: string;
  /** Пол клиента, если он известен сотруднику. */
  gender?: Gender;
  /** Дата рождения клиента. */
  birthDate?: string;
  contact?: ContactPointInput;
};
export type ClientParametersPatch = {
  alias?: string;
  gender?: Gender;
  birthDate?: string;
};
export type ClientLinkConfidence = 'low' | 'medium' | 'high';
export type ClientLinkCandidateMatchedContact = {
  channel: ContactChannel;
  maskedValue: string;
};
export type ClientLinkCandidate = {
  confidence: ClientLinkConfidence;
  /** Есть ли у кандидата хотя бы одно совпадение по контакту, подтверждённому в customer communication context.
   */
  hasVerifiedMatch: boolean;
  /** Идентификатор кандидата, который можно использовать в create link. */
  id: string;
  matchedContacts: ClientLinkCandidateMatchedContact[];
};
export type ClientLink = {
  clientId: string;
  customerId: string;
  id: string;
  linkedAt: string;
  source: 'contact_match';
};
export type ClientParametersCreateLink = {
  candidateId: string;
};
export type ComplexResponsesAll = ComplexHelpersComplexResponse[];
export type ComplexParametersAll = {
  salonFilter?: string;
  employeeFilter?: string;
  pagination?: Pagination;
};
export type ComplexHelpersCreateProcedureRequest = {
  alias?: string;
  description?: string;
  duration: number;
  employeeIds: string[];
  order: number;
  price: Price;
  serviceId: string;
  isOnline?: boolean;
};
export type ComplexParametersCreate = {
  alias?: string;
  description?: string;
  priceShift: ComplexHelpersPriceShift;
  procedures: ComplexHelpersCreateProcedureRequest[];
  isOnline?: boolean;
};
export type ComplexParametersUpdate = {
  alias?: string;
  description?: string;
  priceShift?: ComplexHelpersPriceShift;
  isOnline?: boolean;
};
export type ImportedSalonPreviewItem = {
  recordKey: string;
  action: string;
  reason: string;
  confidence: number;
  completenessScore: number;
  importedSalonId?: string;
  matchedSalonId?: string;
};
export type ImportedSalonPreviewSummary = {
  autoCommitCount: number;
  manualReviewCount: number;
  skippedCount: number;
  failedCount: number;
};
export type ImportedSalonPreviewResponse = {
  items: ImportedSalonPreviewItem[];
  summary: ImportedSalonPreviewSummary;
};
export type ImportedSalonIngestBatchMetadata = {
  runId: string;
  city: string;
  region?: string;
  country?: string;
  timeZoneId: string;
  localeId: string;
  salonType: SalonType;
};
export type ImportedSalonIngestFieldWarning = {
  field: string;
  severity: string;
  message: string;
};
export type ImportedSalonIngestRecord = {
  recordKey: string;
  providerAdapterId: string;
  providerFamily: string;
  externalId: string;
  sourceURL: string;
  name: string;
  ingestStatus: string;
  mapperVersion: string;
  schemaVersion: string;
  rawPayload?: string;
  payloadHash?: string;
  description?: string;
  addressLine?: string;
  city?: string;
  region?: string;
  postalCode?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  phones?: string[];
  websiteURL?: string;
  bookingURL?: string;
  categories?: string[];
  hours?: {
    [key: string]: string;
  };
  images?: string[];
  socialLinks?: string[];
  rating?: number;
  reviewCount?: number;
  completenessScore?: number;
  warnings?: ImportedSalonIngestFieldWarning[];
};
export type ImportedSalonPreviewRequest = {
  metadata: ImportedSalonIngestBatchMetadata;
  records: ImportedSalonIngestRecord[];
};
export type ImportedSalonCommitItem = {
  recordKey: string;
  disposition: string;
  importedSalonId?: string;
  matchedSalonId?: string;
  claimLink?: string;
};
export type ImportedSalonCommitSummary = {
  createdCount: number;
  updatedCount: number;
  matchedExistingCount: number;
  skippedCount: number;
  failedCount: number;
};
export type ImportedSalonCommitResponse = {
  items: ImportedSalonCommitItem[];
  summary: ImportedSalonCommitSummary;
};
export type ImportedSalonCommitRequest = {
  metadata: ImportedSalonIngestBatchMetadata;
  records: ImportedSalonIngestRecord[];
  approvedManualRecordKeys?: string[];
};
export type ImportedSalonClaimLinkResponse = {
  importedSalonId: string;
  claimLink: string;
  expiresAt?: string;
};
export type ImportedSalonClaimLinkRequest = {
  expiresInHours?: number;
};
export type PositionResponsesPartial = {
  id: string;
  title: string;
};
export type EmployeeResponsesPartial = {
  avatar: string;
  contacts: CommunicationContact[];
  id: string;
  inviteLink?: string;
  nickname: string;
  position: PositionResponsesPartial;
  /** Дата soft-delete сотрудника. Отсутствует для активных сотрудников. */
  deletedAt?: string;
};
export type EmployeeParametersAll = {
  /** Если true, в ответе списка будут возвращены также soft-deleted сотрудники. */
  includeDeleted?: boolean;
};
export type AppointmentCreds = number;
export type ClientCreds = number;
export type EmployeeCreds = number;
export type FinanceCreds = number;
export type NotifyCreds = number;
export type PositionCreds = number;
export type ProcedureCreds = number;
export type SalaryCreds = number;
export type SalonCreds = number;
export type StatisticCreds = number;
export type WorktimeCreds = number;
export type CredentialsSet = {
  appointmentCreds: AppointmentCreds;
  clientCreds: ClientCreds;
  employeeCreds: EmployeeCreds;
  financeCreds: FinanceCreds;
  notifyCreds: NotifyCreds;
  positionCreds: PositionCreds;
  procedureCreds: ProcedureCreds;
  salaryCreds: SalaryCreds;
  salonCreds: SalonCreds;
  statisticCreds: StatisticCreds;
  worktimeCreds: WorktimeCreds;
};
export type PositionResponsesFull = {
  creds: CredentialsSet;
  id: string;
  owner: boolean;
  title: string;
};
export type EmployeeResponsesFull = {
  avatar: string;
  contacts: CommunicationContact[];
  id: string;
  inviteLink?: string;
  name: string;
  position: PositionResponsesFull;
  salonId: string;
  /** Дата soft-delete сотрудника. Отсутствует для активных сотрудников. */
  deletedAt?: string;
};
export type EmployeeParametersPatch = {
  name?: string;
  positionId?: string;
};
export type EmployeeParametersInvite = {
  contact?: ContactPointInput;
  nickname?: string;
  positionId: string;
  timetable?: TimetableParametersCreatePattern;
};
export type OfftimeResponsesFull = {
  coefficient: number;
  id: string;
  interval: SafeDateInterval;
  reason?: string;
  timeZoneId: string;
};
export type OfftimeParametersCreate = {
  coefficient: number;
  interval: SafeDateInterval;
  reason?: string;
};
export type PositionParametersCreate = {
  creds: CredentialsSet;
  makeOwner: boolean;
  title: string;
};
export type PositionParametersPatch = {
  creds?: CredentialsSet;
  makeOwner?: boolean;
  title?: string;
};
export type ProcedureResponsesAll = ProcedureHelpersProcedureResponse[];
export type ProcedureParametersAll = {
  salonFilter?: string;
  employeeFilter?: string;
  pagination?: Pagination;
};
export type ProcedureParametersCreate = {
  alias?: string;
  description?: string;
  duration: number;
  employeeIds: string[];
  price: Price;
  serviceId: string;
  isOnline?: boolean;
};
export type ProcedureParametersUpdate = {
  alias?: string;
  description?: string;
  duration?: number;
  price?: Price;
  isOnline?: boolean;
};
export type ProcedureParametersPatchSettings = {
  onlineBookingEnabled?: boolean;
  accessType?: ProcedureAccessType;
  /** Буфер после записи в минутах. */
  postServiceBreakDuration?: number | null;
};
export type ProcedureExecutionParametersPatch = {
  /** Длительность в минутах. */
  duration?: number;
  price?: Price;
};
export type ProductUnit = 'milliliters' | 'grams' | 'pieces';
export type ProductTaxProfile = 'none' | 'vat10' | 'vat20';
export type ProductPricing = {
  supplyPrice: Price;
  retailEnabled: boolean;
  retailPrice: Price;
  taxProfile: ProductTaxProfile;
};
export type ProductCommission = {
  enabled: boolean;
  percent?: number;
};
export type ProductInventory = {
  sku: string;
  additionalSkus: string[];
  supplier?: string;
};
export type ProductStock = {
  trackingEnabled: boolean;
  quantity: number;
  lowStockEnabled: boolean;
  lowStockThreshold?: number;
  reorderQuantity?: number;
  lowStockNotificationEnabled: boolean;
};
export type ProductResponsesProduct = {
  id: string;
  title: string;
  barcode?: string;
  brand?: string;
  category?: string;
  unit: ProductUnit;
  amount?: number;
  shortDescription?: string;
  description?: string;
  photos: string[];
  primaryImageIndex: number;
  pricing: ProductPricing;
  commission: ProductCommission;
  inventory: ProductInventory;
  stock: ProductStock;
  marginPercent: number;
  totalRetailAmount: number;
  totalSupplyAmount: number;
  averageCostAmount: number;
  createdAt: string;
  updatedAt: string;
};
export type ProductResponsesList = ProductResponsesProduct[];
export type ProductParametersAll = {
  search?: string;
  categoryFilter?: string;
  brandFilter?: string;
  supplierFilter?: string;
  inStockOnly?: boolean;
  pagination?: Pagination;
};
export type ProductParametersCreate = {
  title: string;
  barcode?: string;
  brand?: string;
  category?: string;
  unit: ProductUnit;
  amount?: number;
  shortDescription?: string;
  description?: string;
  photos: string[];
  primaryImageIndex: number;
  pricing: ProductPricing;
  commission: ProductCommission;
  inventory: ProductInventory;
  stock: ProductStock;
};
export type ProductParametersUpdate = {
  title?: string;
  barcode?: string;
  brand?: string;
  category?: string;
  unit?: ProductUnit;
  amount?: number;
  shortDescription?: string;
  description?: string;
  photos?: string[];
  primaryImageIndex?: number;
  pricing?: ProductPricing;
  commission?: ProductCommission;
  inventory?: ProductInventory;
  stock?: ProductStock;
};
export type ProductStockAdjustmentResponsesStockAdjustment = {
  id: string;
  productId: string;
  delta: number;
  reason?: string;
  balanceAfter: number;
  createdAt: string;
  createdBy?: string;
};
export type ProductStockAdjustmentResponsesList = ProductStockAdjustmentResponsesStockAdjustment[];
export type ProductStockAdjustmentParametersAll = {
  page?: number;
  per?: number;
};
export type ProductStockAdjustmentParametersCreate = {
  delta: number;
  reason?: string;
};
export type ProductResponsesOptions = {
  brands: string[];
  categories: string[];
  suppliers: string[];
  taxProfiles: ProductTaxProfile[];
  units: ProductUnit[];
};
export type ServiceHelpersServiceResponse = {
  id: string;
  tags: TranslatedServiceTag[];
  title: string;
};
export type ServiceResponsesAll = {
  services: ServiceHelpersServiceResponse[];
};
export type ServiceParametersAll = {
  valueFilter?: string;
  pagination?: Pagination;
};
export type ServiceResponsesCreate = {
  id: string;
  tags: TranslatedServiceTag[];
  title: string;
};
export type ServiceParametersCreate = {
  tags: ServiceTags[];
  title: string;
};
export type ServiceHelpersCase = {
  id: number;
  title: string;
};
export type ServiceHelpersParameter = {
  cases: ServiceHelpersCase[];
  id: string;
  title: string;
};
export type ServiceResponsesRetrieve = {
  id: string;
  parameters: ServiceHelpersParameter[];
  tags: TranslatedServiceTag[];
  title: string;
};
export type ServiceParametersUpdate = {
  tags?: ServiceTags[];
  title?: string;
};
export const {
  usePostAuthAppleMutation,
  usePostAuthGoogleMutation,
  usePostAuthLogoutMutation,
  usePostAuthRefreshMutation,
  usePostMeBookingsMutation,
  useGetMeVisitsQuery,
  useGetMeVisitsByIdQuery,
  usePostMeVisitsByIdCancelMutation,
  usePostMeVisitsByIdConfirmMutation,
  usePostMeVisitsByIdEditServicesMutation,
  usePostMeVisitsByIdEditClientNoteMutation,
  usePostMeVisitsByIdRescheduleMutation,
  usePostClicksBylinkIdByMutation,
  usePostClicksFindMutation,
  usePostClicksFindBylinkIdByMutation,
  useGetClientModelProfileQuery,
  usePostClientModelProfileMutation,
  usePutClientModelProfileMutation,
  useGetCustomerContactsQuery,
  usePostCustomerContactsMutation,
  usePatchCustomerContactByContactIdMutation,
  useDeleteCustomerContactByContactIdMutation,
  usePostDevicesMutation,
  useGetFavoritesQuery,
  usePutFavoritesByIdAddMutation,
  usePutFavoritesByIdRemoveMutation,
  useGetInvitesClientBylinkIdByContactsQuery,
  usePostInvitesClientBylinkIdByMergeMutation,
  usePutInvitesEmployeeBylinkIdByMutation,
  usePutInvitesSalonBylinkIdByMutation,
  useGetAcquisitionLeadSourcesQuery,
  usePostAcquisitionLeadSourcesMutation,
  useGetAcquisitionLeadSourcesByidByQuery,
  usePutAcquisitionLeadSourcesByidByMutation,
  useDeleteAcquisitionLeadSourcesByidByMutation,
  useGetAcquisitionLeadSourcesByidByStatsQuery,
  useGetAcquisitionStatsQuery,
  useGetAcquisitionLeadSourcesByidByCampaignQuery,
  usePutAcquisitionLeadSourcesByidByCampaignMutation,
  usePostAcquisitionLeadSourcesByidByCampaignByEventManagerByManualMutation,
  useGetAcquisitionLeadSourcesByidByPromoterQuery,
  usePutAcquisitionLeadSourcesByidByPromoterMutation,
  useGetNotificationsQuery,
  usePutNotificationsReadedMutation,
  usePutNotificationsReadedByIdMutation,
  useGetBillingRedirectQuery,
  usePostBillingSessionResolveMutation,
  useGetPublicVisitByBookingIdQuery,
  usePostPublicBookingBySalonIdMutation,
  useGetPublicBookingSalonCatalogQuery,
  useGetPublicBookingSalonMastersQuery,
  useGetPublicBookingSalonProfileQuery,
  useGetSalonBysalonIdByCatalogQuery,
  useGetSalonBysalonIdByMastersQuery,
  useGetSalonBysalonIdByProfileQuery,
  useGetSearchQuery,
  usePostWorkspaceBillingPortalSessionMutation,
  useGetWorkspaceBillingCatalogQuery,
  usePostWorkspaceBillingSessionMutation,
  usePostWorkspaceBillingCheckoutSessionMutation,
  usePostWorkspaceBillingChangePlanMutation,
  usePostWorkspaceBillingCancelMutation,
  useGetWorkspaceBillingSummaryQuery,
  usePostWorkspaceConnectOnboardingLinkMutation,
  useGetWorkspaceConnectStatusQuery,
  usePostTimetablesByOwnerByForceMutation,
  useGetTimetablesSchedulesQuery,
  usePostTimetablesSearchSlotsMutation,
  usePostUploadThumbMutation,
  useDeleteUsersMutation,
  useGetUsersQuery,
  usePutUsersMutation,
  useGetUserRecoveryMethodsQuery,
  usePostUserRecoveryMethodsMutation,
  usePatchUserRecoveryMethodByRecoveryMethodIdMutation,
  useDeleteUserRecoveryMethodByRecoveryMethodIdMutation,
  usePostUsersCustomerMutation,
  useDownloadAppleWalletBookingPassQuery,
  useGetWalletGoogleBookingByidByQuery,
  useDeleteWorkspaceMutation,
  useGetWorkspaceQuery,
  usePostWorkspaceMutation,
  usePutWorkspaceMutation,
  useGetWorkspaceByIdQuery,
  usePutWorkspaceActivateMutation,
  usePostWorkspaceAppointmentStartMutation,
  usePostWorkspaceAppointmentCompleteMutation,
  usePostWorkspaceAppointmentNoShowMutation,
  useGetWorkspaceBookingsQuery,
  usePostWorkspaceBookingsMutation,
  useGetWorkspaceBookingByIdQuery,
  usePostWorkspaceBookingApproveMutation,
  usePostWorkspaceBookingRejectMutation,
  usePostWorkspaceBookingCancelMutation,
  usePostWorkspaceBookingRescheduleMutation,
  usePostWorkspaceBookingEditServicesMutation,
  usePostWorkspaceBookingAddStaffNodeMutation,
  useGetWorkspaceClientsQuery,
  usePostWorkspaceClientsMutation,
  useGetWorkspaceClientsByIdQuery,
  usePutWorkspaceClientsByIdMutation,
  useGetWorkspaceClientContactsQuery,
  usePostWorkspaceClientContactsMutation,
  usePatchWorkspaceClientContactByContactIdMutation,
  useDeleteWorkspaceClientContactByContactIdMutation,
  useGetWorkspaceClientsByIdByLinkCandidatesQuery,
  usePostWorkspaceClientsByIdByLinksMutation,
  useGetWorkspaceComplexQuery,
  usePostWorkspaceComplexMutation,
  useDeleteWorkspaceComplexByIdMutation,
  useGetWorkspaceComplexByIdQuery,
  usePutWorkspaceComplexByIdMutation,
  usePostWorkspaceImportedSalonsPreviewMutation,
  usePostWorkspaceImportedSalonsCommitMutation,
  usePostWorkspaceImportedSalonsClaimLinkMutation,
  usePutWorkspaceDeactivateMutation,
  useGetWorkspaceEmployeeContactsQuery,
  usePostWorkspaceEmployeeContactsMutation,
  usePatchWorkspaceEmployeeContactByContactIdMutation,
  useDeleteWorkspaceEmployeeContactByContactIdMutation,
  useGetWorkspaceEmployeesQuery,
  useDeleteWorkspaceEmployeesByIdMutation,
  useGetWorkspaceEmployeesByIdQuery,
  usePutWorkspaceEmployeesByIdMutation,
  useGetWorkspaceEmployeesCredentialsQuery,
  usePostWorkspaceEmployeesInviteMutation,
  useGetWorkspaceSalonContactsQuery,
  usePostWorkspaceSalonContactsMutation,
  usePatchWorkspaceSalonContactByContactIdMutation,
  useDeleteWorkspaceSalonContactByContactIdMutation,
  useGetWorkspaceNotificationsQuery,
  usePutWorkspaceNotificationsReadedMutation,
  usePutWorkspaceNotificationsReadedByIdMutation,
  useDeleteWorkspaceOfftimeByIdMutation,
  useGetWorkspaceOfftimeByOwnerQuery,
  usePostWorkspaceOfftimeByOwnerMutation,
  useGetWorkspacePositionsQuery,
  usePostWorkspacePositionsMutation,
  useDeleteWorkspacePositionsByIdMutation,
  useGetWorkspacePositionsByIdQuery,
  usePutWorkspacePositionsByIdMutation,
  useGetWorkspaceProceduresQuery,
  usePostWorkspaceProceduresMutation,
  useDeleteWorkspaceProceduresByIdMutation,
  useGetWorkspaceProceduresByIdQuery,
  usePutWorkspaceProceduresByIdMutation,
  usePatchWorkspaceProceduresByIdSettingsMutation,
  usePostWorkspaceProceduresByIdArchiveMutation,
  usePostWorkspaceProceduresByIdRestoreMutation,
  useGetWorkspaceProceduresByIdExecutionsByExecutionIdQuery,
  usePatchWorkspaceProceduresByIdExecutionsByExecutionIdMutation,
  useDeleteWorkspaceProceduresByIdExecutionsByExecutionIdMutation,
  useGetWorkspaceProductsQuery,
  usePostWorkspaceProductsMutation,
  useDeleteWorkspaceProductsByidByMutation,
  useGetWorkspaceProductsByidByQuery,
  usePutWorkspaceProductsByidByMutation,
  useGetWorkspaceProductsByidByStockAdjustmentsQuery,
  usePostWorkspaceProductsByidByStockAdjustmentsMutation,
  useGetWorkspaceProductsOptionsQuery,
  useGetWorkspaceServicesQuery,
  usePostWorkspaceServicesMutation,
  useGetWorkspaceServicesByIdQuery,
  usePutWorkspaceServicesByidByMutation,
} = injectedRtkApi;
